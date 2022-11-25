// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const remarkPlugins = [
  require("@akebifiky/remark-simple-plantuml"),
  require('./src/plugins/remark-buetify-tables'),
  require('./src/plugins/remark-default-code-snippet-lang'),
  require('remark-prism'),
  require('remark-emoji'),
  //require('./src/plugins/remark-copy-code-btn'),
]
const vueRemarkCommonOptions = {
  template: './src/templates/Documentation.vue', // Optional
  refs: {
    terms: {
      typeName: 'Term'
    }
  },
  index: ['_index', 'index'],
  remark: {
    autolinkHeadings: {
      content: {
        type: 'text',
        value: '#'
      }
    }
  },
  plugins: remarkPlugins,
}

module.exports = {
  siteName: 'Gridsome',
  siteUrl: 'https://th2.dev',
  plugins: [
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        exclude: [],
        config: {
          '/*': {
            changefreq: 'weekly',
            priority: 0.5
          }
        }
      }
    },
    {
      use: 'gridsome-plugin-robots-txt',
      options: {
        host: 'https://th2.dev',
        sitemap: 'https:/th2.dev/sitemap.xml',
        policy: [
          {
            userAgent: "*",
            allow: null,
            disallow: "/"
          }
        ]
  }
    },
    {
      use: 'gridsome-plugin-typescript',
    },
      // Documentation Nodes
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'DocPage', // Required
        baseDir: './content/docs', // Where .md files are located
        template: './src/templates/Documentation.vue', // Optional
        ...vueRemarkCommonOptions
      }
    },
    require('./src/plugins/gridsome-plugins-th2-readme-pages'),
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'ReadmePage',
        baseDir: './content/.cache/readmes',
        template: './src/templates/Documentation.vue',
        ...vueRemarkCommonOptions
      }
    },
      // Terms Nodes
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: './content/terms/**/*.md',
        typeName: 'Term'
      }
    },
    require('./src/plugins/gridsome-plugin-th2-normalize-docs'),
    require('./src/plugins/gridsome-source-th2-github'),
    require('./src/plugins/gridsome-plugin-th2-check-content'),
    require('./src/plugins/gridsome-plugin-th2-dashboard'),
    require('./src/plugins/gridsome-plugin-content-tree'),
    require('./src/plugins/gridsome-plugin-dev-sitemap')
  ]
}
