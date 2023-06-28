/* eslint-disable @typescript-eslint/no-var-requires */
const config = require("./config")

module.exports = {
  flags: {
    DEV_SSR: false,
  },
  siteMetadata: {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    siteUrl: config.siteUrl,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-material-ui",
      // If you want to use styled components you should change the injection order.
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.title,
        short_name: config.title,
        start_url: `/`,
        background_color: config.themeColor,
        theme_color: config.themeColor,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    //`gatsby-transformer-yaml`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content`,
        name: "content",
      },
    },
    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        documentPaths: [
          "./src/**/*.{ts,tsx}",
          "./node_modules/gatsby-source-sanity/fragments/*.js",
        ],
      },
    },
    `gatsby-plugin-offline`,
    "gatsby-plugin-htaccess",
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: config.themeColor,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: config.siteUrl,
        sitemap: `${config.siteUrl}/sitemap.xml`,
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
}
