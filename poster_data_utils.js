/* eslint-disable @typescript-eslint/no-var-requires */
const glob = require("glob")
const fs = require("fs")
const yaml = require("js-yaml")
const path = require("path")

const getGroupsBySlug = async graphql => {
  const allPosterPrevImagesByRelativeDirectory = indexByRelativeDirectory(
    await query_poster_prev_images(graphql),
  )
  const allPosterPdfsByRelativeDirectory = indexByRelativeDirectory(
    await query_poster_pdfs(graphql),
  )
  const groups = glob
    .sync("content/posters/**/group_info.yaml")
    .map(pathToGroupInfo =>
      load_group(
        pathToGroupInfo,
        allPosterPrevImagesByRelativeDirectory,
        allPosterPdfsByRelativeDirectory,
      ),
    )

  return groupBy(groups, group => `/${group["year"]}/Q${group["quarter"]}`)
}

const query_poster_prev_images = async graphql => {
  return await graphql(`
    query {
      allFile(
        filter: {
          relativePath: { regex: "/posters/.*/" }
          extension: { regex: "/(jpg)|(jpeg)|(png)/" }
        }
      ) {
        edges {
          node {
            id
            relativeDirectory
            publicURL
            childImageSharp {
              fixed(width: 250, height: 200, cropFocus: CENTER) {
                base64
                width
                height
                src
                srcSet
              }
            }
            extension
          }
        }
      }
    }
  `)
}

const indexByRelativeDirectory = results => {
  return results.data.allFile.edges.reduce((indexedMap, edge) => {
    indexedMap[path.join("content", edge.node.relativeDirectory)] = edge.node
    return indexedMap
  }, {})
}

const query_poster_pdfs = async graphql => {
  return await graphql(`
    query {
      allFile(
        filter: {
          relativePath: { regex: "/posters/[0-9]+/" }
          extension: { regex: "/(pdf)/" }
        }
      ) {
        edges {
          node {
            id
            relativeDirectory
            publicURL
          }
        }
      }
    }
  `)
}

const load_group = (
  pathToGroupInfo,
  allPosterPrevImagesByRelativeDirectory,
  allPosterPdfsByRelativeDirectory,
) => {
  const group_root_path = path.dirname(pathToGroupInfo)

  const group_info = yaml.load(fs.readFileSync(pathToGroupInfo, "utf8"))
  group_info["students"] = glob
    .sync(`${group_root_path}/**/student_info.yaml`)
    .map(pathToStudentFolder =>
      load_student_data(
        pathToStudentFolder,
        allPosterPrevImagesByRelativeDirectory,
        allPosterPdfsByRelativeDirectory,
      ),
    )

  const requiredKeys = ["projectTitle", "quarter", "supervisors", "year"]
  requiredKeys.forEach(requiredKey => {
    if (!(requiredKey in group_info)) {
      throw new Error(
        `The required attribute "${requiredKey}" is missing. Please add a this attribute in the file:"\n${pathToGroupInfo}\n"`,
      )
    }
  })

  return group_info
}

const load_student_data = (
  pathToStudentFolder,
  allPosterPrevImagesByRelativeDirectory,
  allPosterPdfsByRelativeDirectory,
) => {
  const student_data = yaml.load(fs.readFileSync(pathToStudentFolder, "utf8"))
  const poster_path = path.join(path.dirname(pathToStudentFolder), "poster.pdf")
  if (!fs.existsSync(poster_path)) {
    throw new Error(
      `There is not pdf file for the poster. Please add a pdf of your poster at:"\n${poster_path}\n"`,
    )
  }
  const image_path = path.join(path.dirname(pathToStudentFolder), "poster.jpg")
  if (!fs.existsSync(image_path)) {
    throw new Error(
      `The poster has no preview image. Please add a preview image at:"\n${image_path}\n"`,
    )
  }
  const requiredKeys = ["firstName", "lastName", "paperUrl", "thesisTitle"]
  requiredKeys.forEach(requiredKey => {
    if (!(requiredKey in student_data)) {
      throw new Error(
        `The required attribute "${requiredKey}" is missing. Please add a this attribute in the file:"\n${pathToStudentFolder}\n"`,
      )
    }
  })
  const paper_domain =
    /(https?:\/\/(.+?\.)?tudelft\.nl\/([A-Za-z0-9\/\-:%\?=]*))/g
  if (!student_data["paperUrl"].match(paper_domain)) {
    throw new Error(
      `The poster at ${pathToStudentFolder} links to an invalid domain:"\n${student_data["paperUrl"]}\n"`,
    )
  }
  const repo_domain =
    /(^$|(https:\/\/(github|hub\.docker)\.com(\/r)*(\/[A-Za-z0-9\-_]*)(\/[A-Za-z0-9\.\-_]*)))/g
  if (
    "repositoryUrl" in student_data &&
    !student_data["repositoryUrl"].match(repo_domain)
  ) {
    throw new Error(
      `The repository at ${pathToStudentFolder} links to an invalid domain:"\n${student_data["repositoryUrl"]}\n"`,
    )
  }

  student_data["prevImage"] =
    allPosterPrevImagesByRelativeDirectory[path.dirname(pathToStudentFolder)]
  student_data["pdfUrl"] =
    allPosterPdfsByRelativeDirectory[path.dirname(pathToStudentFolder)][
      "publicURL"
    ]

  return student_data
}

const compareGroupsByTitle = (a, b) => {
  if (a.projectTitle < b.projectTitle) {
    return -1
  }
  if (a.projectTitle > b.projectTitle) {
    return 1
  }
  return 0
}

const groupBy = function (xs, getKey) {
  return xs.reduce(function (acc, x) {
    const key = getKey(x)
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(x)
    return acc
  }, {})
}

module.exports = {
  getGroupsBySlug,
  compareGroupsByTitle,
}
