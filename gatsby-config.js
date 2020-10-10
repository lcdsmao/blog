/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "lcdsmao",
    description: "lcdsmao blog",
    siteUrl: "https://lcdsmao.dev/",
    social: {
      twitter: "lcdsmao",
      github: "lcdsmao",
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-theme-ui`,
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/content/`,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 600,
            },
          },
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-prismjs`,
          },
        ],
      },
    },
  ],
}
