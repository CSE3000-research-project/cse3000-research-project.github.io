/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path")
const { getGroupsBySlug, compareGroupsByTitle } = require("./poster_data_utils")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const groupsBySlug = await getGroupsBySlug(graphql)
  const allGroupSlugs = Object.keys(groupsBySlug)

  // create a page per edition
  allGroupSlugs.forEach(slug => {
    const context = {
      allGroupSlugs: allGroupSlugs,
      groups: groupsBySlug[slug].sort(compareGroupsByTitle),
    }
    createPage({
      path: slug,
      component: path.resolve(`./src/templates/poster_overview/index.tsx`),
      context,
    })
  })

  // create the index page
  const indexPageContext = { allGroupSlugs }
  createPage({
    path: "/",
    component: path.resolve(`./src/templates/index_page/index.tsx`),
    context: indexPageContext,
  })
}
