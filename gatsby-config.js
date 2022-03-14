const path = require("path/posix");

module.exports = {
  siteMetadata: {
    title: `Orbit Developer`,
    description: `Orbit Developer sites provides several useful documentation for developers on Linux.`,
    author: `Yujŏnja`,
    siteUrl: `https://developer.orbitrc.io/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/orbit-logo-developer.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-root-import`,
      options: {
        resolveModules: [path.join(__dirname, 'src')],
        src: path.join(__dirname, 'src'),
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
