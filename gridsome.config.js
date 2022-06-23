// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
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
        refs: {
          terms: {
            typeName: 'Term'
          }
        },
        index: ['_index', 'index'],
        plugins: [
            '@gridsome/remark-prismjs'
        ],
      }
    },
      // Terms Nodes
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: './content/terms/**/*.md',
        typeName: 'Term'
      }
    }
  ],
  templates: {
    Th2Version: [
      {
        name: 'Modules Dashboard',
        path: '/:folder/boxes/dashboard',
        component: './src/templates/Dashboard.vue'
      }
    ]
  }
}
