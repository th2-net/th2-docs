// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {

  const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

  api.chainWebpack((config, { isServer }) => {
    config.plugin('vuetify-loader').use(VuetifyLoaderPlugin);
  })

  // Add metadata
  api.loadSource(({addMetadata}) => {
    addMetadata('githubRepoLink', 'https://github.com/th2-net/th2-docs',)
  })
}
