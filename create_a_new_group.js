/* eslint-disable @typescript-eslint/no-var-requires */
const { ArgumentParser } = require("argparse")
const fs = require("fs")
const yaml = require("js-yaml")
const path = require("path")

const main = () => {
  const { title, year, supervisors, quarter, groupNumber } = createCLIArgs()

  const root = path.join(__dirname, "content", "posters", `${year}`)
  if (!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }

  const groupsRoot = path.join(root, `Q${quarter}`)
  if (!fs.existsSync(groupsRoot)) {
    fs.mkdirSync(groupsRoot)
  }

  const groupRoot = path.join(groupsRoot, `Group ${groupNumber}`)
  if (!fs.existsSync(groupRoot)) {
    fs.mkdirSync(groupRoot)
  }

  const studentsRoot = path.join(groupRoot, "students")
  if (!fs.existsSync(studentsRoot)) {
    fs.mkdirSync(studentsRoot)
  }

  fs.writeFileSync(
    path.join(groupRoot, `group_info.yaml`),
    yaml.dump({ projectTitle: title, year, supervisors, quarter }),
  )
}

const createCLIArgs = () => {
  const parser = new ArgumentParser({})
  parser.addArgument("--title", {
    help: "The title of the project.",
    type: "string",
    required: true,
  })
  parser.addArgument("--quarter", {
    help: "The quarter in which project was run.",
    type: "int",
    choices: [1, 2, 3, 4],
    required: true,
  })
  parser.addArgument("--year", {
    help: "The year in which project was run. If not specified we assume the current year.",
    type: "int",
    defaultValue: new Date().getFullYear(),
  })
  parser.addArgument("--supervisors", {
    help: "A list of supervisor names.",
    type: "string",
    nargs: "+",
    defaultValue: [],
  })

  parser.addArgument("--groupNumber", {
    help: "Your group number on BrightSpace.",
    type: "int",
    required: true,
  })

  return parser.parseArgs()
}

main()
