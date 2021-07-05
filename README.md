# CSE3000-research-project.github.io

<img src="https://app.travis-ci.com/CSE3000-research-project/cse3000-research-project.github.io.svg?branch=master&amp;status=passed" alt="build:passed"  style="float:right;">

The poster [website](https://CSE3000-research-project.github.io) for the TU Delft course CSE3000 Research Project.

## Contributing

Contributions are always welcome! So feel free to make a Pull request.

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
