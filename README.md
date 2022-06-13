# CSE3000-research-project.github.io

<img src="https://app.travis-ci.com/CSE3000-research-project/cse3000-research-project.github.io.svg?branch=master&amp;status=passed" alt="build:passed"  style="float:right;">

The poster [website](https://CSE3000-research-project.github.io) for the TU Delft course CSE3000 Research Project.

<br>

## Workflow for students

We ask each project group to choose a representative who will update the page with the final posters and papers of the whole group. Here we explain the steps required to make a complete pull request to this repository.

### 1. Forking our repository
<details>
<summary>
Before you can make a PR you must fork the repo.
</summary>

1. Click on the "Fork" button near the top of the page. This creates a copy of the code under your account on the GitHub user account. For more details on how to fork a repository see [this guide](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

2. Clone your fork of the repo from your GitHub account to your local disk:

```bash
git clone git@github.com:YourLogin/cse3000-research-project.github.io.git
cd cse3000-research-project.github.io
```
</details>

<br>

### 2. Setting up the project
<details>
<summary>
Add an upstream remote and make a feature branch.
</summary>

1. Add a new upstream remote by executing the following command.

```bash
git remote add upstream https://github.com/CSE3000-research-project/cse3000-research-project.github.io.git
```

1. Synchronize your branch with the upstream dev branch:

```bash
git checkout dev
git pull upstream dev
```

3. Create a feature branch to hold your development changes:

```bash
git checkout -b my_feature
```

</details>

<br>

### 3. Installing the dependencies
<details>
<summary>
This project works with Node v14.19 (LTS: Fermium).
</summary>

You can download Node.js from [the Node website](https://nodejs.org/en/download/). 

Consider using a version manager to easily change between the Node versions. As one option, you can install `nvm` which also works on Windows [if you are using WLS](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl).

After setting up the correct version of Node, install the dependencies:

```bash
npm install
```

</details>

<br>

### 4. Adding the project group and students

#### Poster storage structure

All project groups are stored based on the year and quarter of their CSE3000 Research Project edition. Within this directory, each project group has its own folder with the name `Group N`.
Each group folder must have a `group_info.yaml` file that contains all the group-related information: *group number*, *project title*, and *names of the supervisors*.  

Each group directory has a subdirectory called `students` where each student must have their own folder with three files:

* `student_info.yaml` file with student-related information: *first name*, *last name*, *thesis title*, *link to the paper*, and optionally *link to the code*.
* `poster.jpg` which is a preview image of the poster
* `poster.pdf` academic poster itself.

<details>
<summary>
See here for the example structure of the directory.
</summary>

```
content
└───posters
    └───2021
        └───Q4
        │   └───Group 1
        │   │   │   group_info.yaml
        │   │   └───students
        │   │       └───John Doe
        │   │       │       poster.jpg
        │   │       │       poster.pdf
        │   │       │       student_info.yaml
```
</details>

<br>

#### Creating a new project

To help you create the folder structure for a new project, we created the following CLI command:

```bash
  node create_a_new_group.js \
  --title "Example title" \
  --year 2019 \
  --quarter 4 \
  --groupNumber 42 \
  --supervisors "Joe Doe" "Jane Doe"
```

<details>
<summary>
See here for the description of all arguments of create_a_new_group.js.
</summary>

| Parameter     | Type           | Description |
| :------------ | :------------- | :-----------|
| `title`       | `string`       | **Required**. The title of the project. |
| `year`        | `int`          | Year when the project was conducted. By default the current year. |
| `quarter`     | `int`          | **Required**. Quarter when the project was conducted. |
| `groupNumber` | `string`       | **Required**. Your group number on BrightSpace. |
| `supervisors` | `List[string]` | A list of supervisor names. |
</details>

<br>

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
  --paperUrl "https://repository.tudelft.nl/islandora/search/?collection=education" \
  --posterPdf "absolute/path/to/poster.pdf" \
  --posterImg "absolute/path/to/poster.jpg" \
  --repositoryUrl "https://github.com/explore"
```

**Note:** You should run this command only after a project structure was generated.

<details>
<summary>
See here for the description of all arguments of create_a_new_student.js.
</summary>

| Parameter     | Type     | Description |
| :------------ | :------- | :-----------|
| `title`       | `string` | **Required**. The title of the project. |
| `year`        | `int`    | Year when the project was conducted. By default the current year. |
| `quarter`     | `int`    | **Required**. Quarter when the project was conducted. |
| `groupNumber` | `string` | **Required**. Your group number on BrightSpace. |
| `firstName`   | `string` | **Required**. The first name of the student. |
| `lastName`    | `string` | **Required**. The last name of the student |
| `paperUrl`    | `string` | A link to the TU Delft repository version of your paper |
| `posterPdf`   | `string` | An *absolute* path to the location of the pdf version of your poster. If the flag is left empty, you have to add the pdf manually. **Important:** the website cannot be built if this image is not present in your folder. |
| `posterImg`   | `string` | An *absolute* path to the location of the JPG version of your poster. This image will be used as a preview of your poster. If the flag is left empty, you have to add the image manually. **Important:** the website cannot be built if this image is not present in your folder. |
</details>

<br>

### 5. Running the website locally
<details>
<summary>
Before you make a pull request, please check if the website works on your local machine.
</summary>

#### Develop

To start a development server run the following command:

```bash
  npm start
```

and navigate to `localhost:8000`.

#### Build

You can also build the static website. First run:

```bash
  npm run build
```

and then:

```bash
  npm run serve
```

and finally navigate to `localhost:9000`.
</details>

<br>

### 6. Making a PR

You can make a PR using the following steps:

1. Synchronize your branch with the upstream dev branch:

```bash
git checkout dev
git pull upstream dev
```

2. Add changed files using `git add` and then `git commit`:

```bash
git add modified_files
git commit -m "Add Group N files."
git push -u origin my_feature
```

**Note:** Please make sure that your commit message follows the format `Add Group N files` or `Update Group N files` where `N` is the number of your group on Brightspace.  
**Note:** If you run across an issue with the node_modules hooks (`command not found`), you can commit your files with the flag `--no-verify`.

3. Make a PR on GitHub to the `dev` branch. See [these instructions](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) if you don't know how to do this.

<br>

## Deployment

The website deployed on [CSE3000-research-project.github.io](https://CSE3000-research-project.github.io) using GitHub pages.
This website gets updated automatically every time the main branch is updated using the Travis-ci build script.
For more information, see the `.travis.yml` file or this [link](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/how-gatsby-works-with-github-pages/).

<br>

## Contributing

Contributions are always welcome! Feel free to make a pull request.
