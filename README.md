# CSE3000-research-project.github.io

<img src="https://app.travis-ci.com/CSE3000-research-project/cse3000-research-project.github.io.svg?branch=master&amp;status=passed" alt="build:passed"  style="float:right;">

The poster [website](https://CSE3000-research-project.github.io) for the TU Delft course CSE3000 Research Project.

## Contributing

Contributions are always welcome! So feel free to make a Pull request.

### Forking the repo

Before you can make a PR you must fork the repo. You can do this using the following steps:

1. Fork the project repository: click on the ‘Fork’ button near the top of the page. This creates a copy of the code under your account on the GitHub user account. For more details on how to fork a repository see [this guide](https://docs.github.com/en/get-started/quickstart/fork-a-repo).
2. Clone your fork of the repo from your GitHub account to your local disk:

```bash
git clone git@github.com:YourLogin/cse3000-research-project.github.io.git
cd cse3000-research-project.github.io
```

3. Install the dependencies:

```bash
npm install
```

4. Add the upstream remote. This saves a reference to the main repository, which you can use to keep your repository synchronized with the latest changes:

```bash
git remote add upstream https://github.com/CSE3000-research-project/cse3000-research-project.github.io.git
```

### Making a PR

You can make a PR using the following steps:

1. Synchronize your main branch with the upstream main branch:

```bash
git checkout master
git pull upstream master
```

2. Create a feature branch to hold your development changes:

```bash
git checkout -b my_feature
```

3. Develop the feature on your feature branch on your computer, using Git to do the version control. When you’re done editing, add changed files using git add and then git commit:

```bash
git add modified_files
git commit
git push -u origin my_feature
```

4. Make a PR on GitHub. See [these instructions](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) if you don't know how to do this.

### Poster storage structure

All the groups are grouped in based on the year and quarter of the research project edition.
Within this group, each project has its own folder with the name `Group i`.
Each group folder must have a `group_info.yaml` file containing all the group-related information, e.g., project title, supervisor names, etc.
Each group folder also has a subfolder called students.
Within this student folder, each student has their own folder, which contains three files.
The `student_info.yaml` file contains all the student-related information, e.g., name, thesis title, link to the paper, etc.
This folder also contains a preview named `poster.jpg` and the poster itself named `poster.pdf`.

```
content
  posters
    2021
      Q4
        Group 1
          group_info.yaml
          students
            John Doe
              poster.jpg
              poster.pdf
              student_info.yaml
```

#### Create a new project

To help you create the folder structure for a new project, we created the following CLI command:

```bash
  node create_a_new_group.js \
  --title "Example title" \
  --year 2019 \
  --quarter 4 \
  --groupNumber 42 \
  --supervisors "Joe Doe" "Jane Doe"
```

| Parameter     | Type           | Description                                                                          |
| :------------ | :------------- | :----------------------------------------------------------------------------------- |
| `title`       | `string`       | **Required**. The title of the project.                                              |
| `year`        | `int`          | The year in which the project was run. If not specified, we assume the current year. |
| `quarter`     | `int`          | **Required**. The quarter in which the project was run. Either 1, 2, 3 or 4.         |
| `groupNumber` | `string`       | **Required**. Your group number on BrightSpace.                                      |
| `supervisors` | `List[string]` | A list of supervisor names.                                                          |

#### Create a new student

To help you create the folder structure for a new student we created the following CLI command:

```bash
  node create_a_new_student.js \
  --title "Example title" \
  --year 2019 \
  --quarter 4 \
  --groupNumber 42 \
  --firstName "Joe" \
  --lastName "Doe" \
  --paperUrl "https://repository.tudelft.nl/islandora/object/uuid:d3deaccc-db8b-4fe0-8328-faaf4fa6b598?collection=education" \
  --posterPdf "abs/path/to/poster.pdf" \
  --posterImg "abs/path/to/poster.jpg" \
```

| Parameter     | Type     | Description                                                                                                                                                                                                                                                                |
| :------------ | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | `string` | **Required**. The title of the project.                                                                                                                                                                                                                                    |
| `year`        | `int`    | The year in which the project was run. If not specified, we assume the current year.                                                                                                                                                                                       |
| `quarter`     | `int`    | **Required**. The quarter in which the project was run. Either 1, 2, 3 or 4.                                                                                                                                                                                               |
| `groupNumber` | `string` | **Required**. Your group number on BrightSpace.                                                                                                                                                                                                                            |
| `firstName`   | `string` | **Required**. The first name of the student.                                                                                                                                                                                                                               |
| `lastName`    | `string` | **Required**. The last name of the student                                                                                                                                                                                                                                 |
| `paperUrl`    | `string` | A link to the TU Delft repository version of your paper                                                                                                                                                                                                                    |
| `posterPdf`   | `string` | An absolute path to the location of the pdf version of your poster. If the flag is left empty, you have to add the pdf manually. Important the website cannot be built if this image is not present in your folder.                                                        |
| `posterImg`   | `string` | An absolute path to the location of the JPG version of your poster. This image will be used as a preview of your poster. If the flag is left empty, you have to add the image manually. Important the website cannot be built if this image is not present in your folder. |

**Note**: We assume here that you make this student after his project structure has already been created.

## Deployment

The website deployed on [CSE3000-research-project.github.io](https://CSE3000-research-project.github.io) using GitHub pages.
This website gets updated automatically every time the main branch is updated using the Travis-ci build script.
For more information, see the `.travis.yml` file or this [link](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/how-gatsby-works-with-github-pages/).

## Run Locally

If you want to try out the website locally, you can do this as follows.

### Install

The project is gatsby based website and thus can be installed using NPM as follows:

```bash
  https://github.com/CSE3000-research-project/cse3000-research-project.github.io.git
  cd cse3000-research-project.github.io
  npm install
```

### Develop

To start a development server run the following command:

```bash
  npm develop
```

### Build

To build the static website run the following command:

```bash
  npm build
```
