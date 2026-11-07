# Putting your poster on the CSE3000 website

Every student submits their own poster through a web form. You need a GitHub account, but you do not need git, Node, or a copy of this repository.

Your submission is a public GitHub issue. The issue and your poster PDF are visible to anyone as soon as you submit, before the course staff review them.

## Before you start

Have these ready:

- **Your poster as a PDF**: one page, at most 25 MB. The website shows only the first page. You do not need to make a JPG; a preview is made for you.
- **The link to your paper in the [TU Delft Education repository](https://repository.tudelft.nl/)**, for example `https://resolver.tudelft.nl/uuid:...`. If your paper is not online yet, leave the field empty and add the link later.
- **Optionally, a link to your code.** See "Archiving your code" below.
- Your group number on Brightspace, the project title, and the names of your supervisors. Use the same project title and supervisors as the rest of your group. The first submission from your group that the staff merge sets these for the whole group.

## Submitting

1. Open [the poster submission form](https://github.com/CSE3000-research-project/cse3000-research-project.github.io/issues/new?template=poster-submission.yml).
2. Replace the placeholders in the title with your name and group number.
3. Fill in the fields. Drag your poster PDF into the **Poster PDF** box and wait until a link like `[poster.pdf](https://github.com/user-attachments/...)` appears.
4. Choose a licence for your code and for your poster (see below), tick both permission boxes, and click the green button at the bottom (**Create** or **Submit new issue**).

When the check has run, a bot adds a comment to your issue:

- **"Your submission passed the checks"**: the course staff review your submission and put it on the website. Read the **Notes** in the comment, if there are any; they point out things such as a missing paper link.
- **"Your submission cannot be added yet"**: the comment lists what to fix.

## Fixing or changing your submission

Click `...` → **Edit** at the top of your issue. GitHub then shows your answers as plain text, not as a form:

- Change only the text under each `###` heading. Keep the headings exactly as they are; the bot uses them to find your answers.
- Keep `- [X]` in front of both permission lines.
- To replace your poster, delete the old `[poster.pdf](...)` link and drag the new PDF in its place. Leave only one link.

Save the issue. The bot checks it again and updates its comment.

Use the same issue for later changes, such as adding the paper link once your paper is online. If your issue has been closed, fill in a new form instead; it replaces your earlier submission.

## Choosing licences

Licensing should not be a source of stress for most students. The advice below comes from a TU Delft data steward.

- **Code**
  - Look at the licences of the libraries you make significant use of, and choose one of those.
  - If one of them is GPL, LGPL, AGPL or EUPL, you should generally release your code under the same licence. These "copyleft" licences can matter if you later work with industry partners; ask a TU Delft data steward if that applies to you.
  - When in doubt, choose **MIT**.
  - Do not use a Creative Commons licence for code.
- **Machine learning models**: avoid the new licences written specifically for ML models. Use the licence of the model you modified, or a permissive licence such as MIT or Apache-2.0.
- **Poster**: Creative Commons licences are appropriate, and **CC BY 4.0** is the best default. If your poster combines material under other Creative Commons licences, choose the most restrictive of them. If none of the four options in the form fits, ask the course staff.

More help: [choosealicense.com](https://choosealicense.com/) and the [Turing Way chapter on licensing](https://book.the-turing-way.org/reproducible-research/licensing).

## Archiving your code

We recommend archiving the final version of your code in [4TU.ResearchData](https://data.4tu.nl/), which accepts code from student projects:

1. Create your own dataset on 4TU.ResearchData and upload the final version of your code, with a licence chosen as described above.
2. Put the dataset's DOI (`https://doi.org/10.4121/...`) in the **Link to your code** field of the form.
3. The course staff add your dataset to the CSE3000 collection for your year, so all projects of a year can be found together. You do not need to do anything for this.

If you sign in to 4TU.ResearchData with your TU Delft account, you lose access to your dataset when you leave TU Delft. According to a TU Delft data steward, changes after that are rarely needed, and the 4TU.ResearchData administrators can make them.

Other accepted code links, all starting with `https://`: Zenodo (a `zenodo.org` link or a `doi.org/10.5281/...` DOI), GitHub, GitLab (TU Delft or gitlab.com), Codeberg and Docker Hub.

## Questions

Ask your supervisor or the course staff on Brightspace, or comment on your issue.
