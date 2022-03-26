module.exports = {
  siteMetadata: {
    siteUrl: `https://www.jchui.me`,
  },
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`poppins`],
        display: 'swap',
      },
    },
  ],
};
