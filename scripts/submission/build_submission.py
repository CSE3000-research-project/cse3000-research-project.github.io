"""Turn a poster-submission issue into the folder structure the website expects.

Reads the issue from $GITHUB_EVENT_PATH, validates the answers, downloads the
poster PDF, renders a JPG preview, and writes everything to an output folder:

    <out>/files/<year>/Q<q>/Group <n>/group_info.yaml
    <out>/files/<year>/Q<q>/Group <n>/students/<First Last>/{student_info.yaml,poster.pdf,poster.jpg}
    <out>/report.json

This script runs on untrusted input in a job without write access. It never commits;
the publish job does that from report.json.
"""

import argparse
import json
import os
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

import yaml

FORM = Path(__file__).resolve().parents[2] / ".github" / "ISSUE_TEMPLATE" / "poster-submission.yml"
NO_RESPONSE = "_No response_"
MAX_PDF_BYTES = 25 * 1024 * 1024
PREVIEW_LONG_SIDE = 1600

# Stricter than poster_data_utils.js (anchored, host-only subdomains), so a PR
# that passes here also builds.
PAPER_URL = re.compile(r"^(|https?://([A-Za-z0-9-]+\.)*tudelft\.nl/[A-Za-z0-9/\-:%?=._]*)$")
REPOSITORY_URL = re.compile(
    r"^(|https://(codeberg\.org|zenodo\.org|data\.4tu\.nl|doi\.org/10\.(4121|5281)"
    r"|gitlab((\.ewi)?\.tudelft\.nl|\.com)|(github|hub\.docker)\.com(/r)?)(/[A-Za-z0-9.\-_]*)+)$"
)
ATTACHMENT_URL = re.compile(
    r"https://(github\.com/user-attachments/files/\d+/[^\s)\]]+"
    r"|github\.com/[^/\s]+/[^/\s]+/files/\d+/[^\s)\]]+"
    r"|[a-z0-9.-]*githubusercontent\.com/[^\s)\]]+)"
)
# Folder names: no path or URL-special characters, no leading or trailing dot.
NAME = re.compile(r"^(?![.])[^\x00-\x1f/\\:*?\"<>|#%\[\]{}~!]{1,60}(?<![.])$")


def form_labels():
    """Map each visible label in the issue form to its field id."""
    form = yaml.safe_load(FORM.read_text(encoding="utf-8"))
    return {
        item["attributes"]["label"]: item["id"]
        for item in form["body"]
        if "id" in item
    }


def parse_issue_body(body):
    """Split the rendered issue body ('### Label' sections) into {field id: text}."""
    labels = form_labels()
    fields = {}
    for match in re.finditer(r"^### (.+?)\n(.*?)(?=^### |\Z)", body, re.M | re.S):
        label, value = match.group(1).strip(), match.group(2).strip()
        if label in labels:
            fields[labels[label]] = "" if value == NO_RESPONSE else value
    return fields


def clean_name(value):
    return re.sub(r"\s+", " ", value).strip()


def validate(fields):
    """Return (data, errors, warnings). data is only usable when errors is empty."""
    errors, warnings = [], []
    get = lambda key: fields.get(key, "").strip()

    year = get("year")
    if not re.fullmatch(r"20\d\d", year):
        errors.append(f"**Year** must be a four-digit year, got `{year}`.")

    quarter = get("quarter")
    if not re.fullmatch(r"Q[1-4]", quarter):
        errors.append(f"**Quarter** must be Q1 to Q4, got `{quarter}`.")

    group = get("group_number").lstrip("0") or "0"
    if not re.fullmatch(r"[1-9]\d{0,3}", group):
        errors.append(f"**Group number** must be a number, got `{get('group_number')}`.")

    # A trailing dot ("Jr.") is dropped: Windows cannot check out such a folder.
    first, last = (clean_name(get(k)).rstrip(".") for k in ("first_name", "last_name"))
    for label, value in (("First name", first), ("Last name", last)):
        if not NAME.fullmatch(value) or ".." in value:
            errors.append(
                f"**{label}** is empty or contains characters such as `/`, `:`, `#` or `%`."
            )

    supervisors = [clean_name(s) for s in get("supervisors").splitlines() if s.strip()]
    if not supervisors:
        errors.append("**Supervisors** is empty; give at least one name.")

    for key, label in (("project_title", "Project title"), ("paper_title", "Paper title")):
        if not get(key):
            errors.append(f"**{label}** is empty.")

    paper_url = get("paper_url")
    if not PAPER_URL.fullmatch(paper_url):
        errors.append(
            "**Link to your paper in the TU Delft Education repository** must be a `tudelft.nl` link "
            f"without characters such as `&`, `#` or `+`, got `{paper_url}`."
        )
    elif not paper_url:
        warnings.append(
            "No paper link yet. Edit this issue to add it once your paper is in the Education repository."
        )

    repository_url = get("repository_url").rstrip("/")
    if not REPOSITORY_URL.fullmatch(repository_url):
        errors.append(
            "**Link to your code** must be an `https` link to 4TU.ResearchData, Zenodo, GitHub, GitLab, "
            f"Codeberg or Docker Hub, without `?` or `#`, got `{repository_url}`."
        )

    code_licence = get("code_licence")
    if repository_url and code_licence == "No code published":
        warnings.append("You gave a code link but chose **No code published** as licence.")

    consent = get("consent")
    if consent.count("[X]") + consent.count("[x]") < 2:
        errors.append("Both **Permission to publish** boxes must be ticked.")

    urls = [m.group(0) for m in ATTACHMENT_URL.finditer(get("poster_pdf"))]
    if not urls:
        errors.append(
            "**Poster PDF** has no uploaded file. Drag the PDF into the box and wait for the link to appear."
        )
    elif len(urls) > 1:
        errors.append(
            "**Poster PDF** contains more than one file. Delete the old link so only your final poster is left."
        )

    data = {
        "year": int(year) if year.isdigit() else None,
        "quarter": int(quarter[1]) if len(quarter) == 2 else None,
        "group": int(group) if group.isdigit() else None,
        "group_info": {
            "projectTitle": clean_name(get("project_title")),
            "year": int(year) if year.isdigit() else None,
            "supervisors": supervisors,
            "quarter": int(quarter[1]) if len(quarter) == 2 else None,
        },
        "student_info": {
            "thesisTitle": clean_name(get("paper_title")),
            "paperUrl": paper_url,
            "firstName": first,
            "lastName": last,
            "repositoryUrl": repository_url,
            "codeLicence": "" if code_licence == "No code published" else code_licence,
            "posterLicence": get("poster_licence"),
        },
        "poster_url": urls[0] if urls else None,
    }
    return data, errors, warnings


def download(url, dest):
    # No token: attachments on a public repository are public, and a token sent
    # here would follow the redirect to the storage host.
    request = urllib.request.Request(url, headers={"User-Agent": "cse3000-poster-bot"})
    with urllib.request.urlopen(request, timeout=60) as response:
        payload = response.read(MAX_PDF_BYTES + 1)
    if len(payload) > MAX_PDF_BYTES:
        raise ValueError("the PDF is larger than 25 MB")
    dest.write_bytes(payload)


def page_count(pdf):
    info = subprocess.run(["pdfinfo", str(pdf)], capture_output=True, text=True, timeout=60)
    if info.returncode != 0:
        raise ValueError("the file could not be read as a PDF")
    match = re.search(r"^Pages:\s+(\d+)", info.stdout, re.M)
    return int(match.group(1)) if match else 0


def render_preview(pdf, jpg):
    """First page as a JPG of at most PREVIEW_LONG_SIDE pixels on its long side."""
    stem = jpg.with_suffix("")
    subprocess.run(
        ["pdftoppm", "-jpeg", "-jpegopt", "quality=80", "-f", "1", "-l", "1",
         "-scale-to", str(PREVIEW_LONG_SIDE), "-singlefile", str(pdf), str(stem)],
        check=True, capture_output=True, timeout=120,
    )


def expected_edition(created_at):
    """(year, quarter) of the edition a submission made on this date most likely belongs to.

    Posters of the Q2 edition are submitted around January, those of Q4 around June.
    """
    year, month = int(created_at[:4]), int(created_at[5:7])
    if month >= 10:
        return year + 1, 2
    return (year, 2) if month <= 3 else (year, 4)


def build(event, out):
    issue = event["issue"]
    report = {"issue": issue["number"], "ok": False, "errors": [], "warnings": []}
    data, errors, warnings = validate(parse_issue_body(issue.get("body") or ""))
    report["errors"], report["warnings"] = errors, warnings

    if data["year"] and data["quarter"] and issue.get("created_at"):
        year, quarter = expected_edition(issue["created_at"])
        if (data["year"], data["quarter"]) != (year, quarter):
            warnings.append(
                f"You chose Q{data['quarter']} {data['year']}, but a poster submitted now usually "
                f"belongs to Q{quarter} {year}. Check **Year** and **Quarter**; they decide where "
                "your poster appears on the website."
            )

    # Check the poster even when other answers have errors, so the student
    # gets every problem in one comment instead of one round at a time.
    staging = out / "poster"
    staging.mkdir(parents=True, exist_ok=True)
    pdf, jpg = staging / "poster.pdf", staging / "poster.jpg"
    if data["poster_url"]:
        try:
            download(data["poster_url"], pdf)
            if pdf.read_bytes()[:5] != b"%PDF-":
                raise ValueError("the uploaded file is not a PDF")
            pages = page_count(pdf)
            if pages != 1:
                warnings.append(f"The PDF has {pages} pages; the website preview shows only the first.")
            render_preview(pdf, jpg)
        except Exception as exc:  # report every failure back to the student
            errors.append(f"**Poster PDF** could not be processed: {exc}.")
    if errors:
        return report

    info = data["student_info"]
    group_dir = Path(f"{data['year']}/Q{data['quarter']}/Group {data['group']}")
    student_dir = group_dir / "students" / f"{info['firstName']} {info['lastName']}"
    files = out / "files"
    (files / student_dir).mkdir(parents=True, exist_ok=True)
    pdf.replace(files / student_dir / "poster.pdf")
    jpg.replace(files / student_dir / "poster.jpg")

    dump = lambda d: yaml.safe_dump(d, sort_keys=False, allow_unicode=True, width=10_000)
    (files / group_dir / "group_info.yaml").write_text(dump(data["group_info"]), encoding="utf-8")
    (files / student_dir / "student_info.yaml").write_text(dump(info), encoding="utf-8")

    report.update(
        ok=True,
        group_dir=str(group_dir),
        student_dir=str(student_dir),
        student=f"{info['firstName']} {info['lastName']}",
        group=data["group"],
        preview_kb=round((files / student_dir / "poster.jpg").stat().st_size / 1024),
    )
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--out", type=Path, required=True)
    args = parser.parse_args()

    event = json.loads(Path(os.environ["GITHUB_EVENT_PATH"]).read_text(encoding="utf-8"))
    args.out.mkdir(parents=True, exist_ok=True)
    report = build(event, args.out)
    (args.out / "report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
