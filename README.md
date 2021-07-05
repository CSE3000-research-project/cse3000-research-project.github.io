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

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. The title of the project. |
| `year` | `int` | The year in which the project was run. If not specified, we assume the current year.|
| `quarter` | `int` | **Required**. The quarter in which the project was run. Either 1, 2, 3 or 4. |
| `groupNumber` | `string` | **Required**. Your group number on BrightSpace. |
| `supervisors` | `List[string]` |A list of supervisor names.|

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
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. The title of the project. |
| `year` | `int` | The year in which the project was run. If not specified, we assume the current year.|
| `quarter` | `int` | **Required**. The quarter in which the project was run. Either 1, 2, 3 or 4. |
| `groupNumber` | `string` | **Required**. Your group number on BrightSpace. |
| `firstName` | `string` |**Required**.  The first name of the student. |
| `lastName` | `string` |**Required**.  The last name of the student |
| `paperUrl` | `string` |A link to the TU Delft repository version of your paper |
| `posterPdf` | `string` | An absolute path to the location of the pdf version of your poster. If the flag is left empty, you have to add the pdf manually. Important the website cannot be built if this image is not present in your folder. |
| `posterImg` | `string` | An absolute path to the location of the JPG version of your poster. This image will be used as a preview of your poster. If the flag is left empty, you have to add the image manually. Important the website cannot be built if this image is not present in your folder.|
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
