/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `lcdsmao`,
    titleTemplate: `%s | lcdsmao`,
    description: `lcdsmao blog`,
    siteUrl: `https://lcdsmao.dev/`,
    social: {
      twitter: `lcdsmao`,
      github: `lcdsmao`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `lcdsmao`,
        short_name: `lcdsmao`,
        start_url: `/`,
        lang: `en`,
        background_color: `#fafaf9`,
        theme_color: `#e63b19`,
        display: `standalone`,
        icon: `src/images/icon.png`,
        theme_color_in_head: false,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 600,
            },
          },
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Nunito\:400,600,700,800`, `Roboto Mono`],
        display: "swap",
      },
    },
    `gatsby-plugin-theme-ui`,
  ],
}
