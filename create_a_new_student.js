/* eslint-disable @typescript-eslint/no-var-requires */
const { ArgumentParser } = require("argparse")
const fs = require("fs")
const yaml = require("js-yaml")
const path = require("path")

const main = () => {
  const {
    firstName,
    lastName,
    title,
    year,
    quarter,
    groupNumber,
    paperUrl,
    posterPdf,
    posterImg,
    repositoryUrl,
  } = createCLIArgs()

  const posterFolder = path.join(__dirname, "content", "posters", `${year}`)
  if (!fs.existsSync(posterFolder)) {
    fs.mkdirSync(posterFolder)
  }

  const groupsFolder = path.join(posterFolder, `Q${quarter}`)
  if (!fs.existsSync(groupsFolder)) {
    fs.mkdirSync(groupsFolder)
  }

  const groupFolder = path.join(groupsFolder, `Group ${groupNumber}`)
  if (!fs.existsSync(groupFolder)) {
    fs.mkdirSync(groupFolder)
  }

  const studentsFolder = path.join(groupFolder, "students")
  if (!fs.existsSync(studentsFolder)) {
    fs.mkdirSync(studentsFolder)
  }

  const root = path.join(studentsFolder, `${firstName} ${lastName}`)
  if (!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }

  const data = {
    thesisTitle: title,
    paperUrl,
    firstName,
    lastName,
    repositoryUrl,
  }
  fs.writeFileSync(
    path.join(root, `student_info.yaml`),
    yaml.dump(data, { lineWidth: -1 }),
  )

  if (posterPdf) {
    fs.copyFileSync(posterPdf, path.join(root, `poster.pdf`))
  } else {
    console.log(
      "[WARNING] 'posterPdf' flag was not provided! Manual additon of 'poster.pdf' is needed!",
    )
  }

  if (posterImg) {
    fs.copyFileSync(posterImg, path.join(root, `poster.jpg`))
  } else {
    console.log(
      "[WARNING] 'posterImg' flag was not provided! Manual additon of 'poster.jpg' is needed!",
    )
  }
}

const createCLIArgs = () => {
  const parser = new ArgumentParser({})
  parser.addArgument("--title", {
    help: "The title of the thesis.",
    type: "string",
  })
  parser.addArgument("--firstName", {
    help: "The first name of the student",
    type: "string",
    required: true,
  })
  parser.addArgument("--lastName", {
    help: "The last name of the student",
    type: "string",
    required: true,
  })
  parser.addArgument("--paperUrl", {
    help: "A link to the TU Delft repository version of your paper",
    defaultValue: "",
    type: "string",
  })
  parser.addArgument("--quarter", {
    help: "The quarter in which project was run.",
    type: "int",
    choices: [1, 2, 3, 4],
    required: true,
  })
  parser.addArgument("--year", {
    help: "The year in which project was run.",
    type: "int",
    defaultValue: new Date().getFullYear(),
  })
  parser.addArgument("--groupNumber", {
    help: "Your group number on BrightSpace.",
    type: "int",
    required: true,
  })
  parser.addArgument("--posterPdf", {
    help: "An absolute path to the location of your poster.",
    type: "string",
  })
  parser.addArgument("--posterImg", {
    help: "An absolute path to the location of your poster.",
    type: "string",
  })
  parser.addArgument("--repositoryUrl", {
    help: "If applicable, link to the repository with your code.",
    defaultValue: "",
    type: "string",
  })

  return parser.parseArgs()
}

main()
