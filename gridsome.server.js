// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {

  const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
  const {getDocumentedTh2Versions, getRepoInfo, getAllTh2NetRepos, getRepoReleases, findTermsInDoc} = require("./src/utils/buildFunctions");
  const {saveDashboardData, getReleasesFeedRepos, getReposFamiliesByTopics} = require("./src/utils/dashboardBuild");
  const {savePagesTrees} = require('./src/utils/pagesTree')
  const { markdownToTxt } = require('markdown-to-txt')
  const versions = getDocumentedTh2Versions()

  api.chainWebpack((config, { isServer }) => {
    config.plugin('vuetify-loader').use(VuetifyLoaderPlugin);
  })

  // Update pages metadata
  api.onCreateNode( node => {
    if (node.internal.typeName === 'DocPage') {
      node.terms = findTermsInDoc(node.content)
      const mdDescription = /^[\w\W]*<!--more-->/.exec(node.content)
      if (mdDescription)
        node.description = markdownToTxt(mdDescription[0])
      return node
    }
    if (node.internal.typeName === 'Term') {
      node.id = node.title
      return node
    }
  })

  api.loadSource(async ({ getCollection, addCollection, store }) => {
    const repositoriesCollection = addCollection('Repository')
    const releasesCollection = addCollection('Release')
    const topicsCollection = addCollection('Topic')
    const docPagesCollection = getCollection('DocPage')
    for (const docPage of docPagesCollection._collection.data) {
      if (docPage.repo && docPage.repo_owner) {
        const {repository, releases} = await getRepoInfo(docPage.repo_owner, docPage.repo)
        for (const release of releases){
          releasesCollection.addNode(release)
        }
        repository.releases = releases.map(r => store.createReference('Release', r.id))
        for (const topic of repository.topics) {
          topicsCollection.addNode({ id: topic, title: topic })
        }
        repository.topics = repository.topics.map(t => store.createReference('Topic', t.id))
        repositoriesCollection.addNode(repository)
        docPage._githubRepository = store.createReference('Repository', repository.id)
        docPage.internal.mimeType = 'text/markdown'
        docPage.repo = null
        docPage.repo_owner = null
        docPage.internal.content = docPage.content
        if (docPage._githubRepository)
          docPagesCollection.updateNode(docPage)
      }
    }
  })

  // Move common pages to every version
  api.loadSource(({ getCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const docPages = getCollection('DocPage')
    for (const docPage of docPages._collection.data.filter(page => page.path.startsWith('/versions'))) {
      docPage.internal.mimeType = 'text/markdown'
      docPage.internal.content = docPage.content
      if (process.env.NODE_ENV === 'production')
        docPages.removeNode(docPage.id)
      const path = docPage.path.replace('/versions', '')
      docPages.addNode({...docPage, path, id: path, $uid: path})
    }
    for (const docPage of docPages._collection.data.filter(page => page.path.startsWith('/common'))) {
      docPage.internal.mimeType = 'text/markdown'
      docPage.internal.content = docPage.content
      if (process.env.NODE_ENV === 'production')
        docPages.removeNode(docPage.id)
      for (const version of versions){
        const path = docPage.path.replace('/common', `/${version}`)
        docPages.addNode({...docPage, path, id: path, $uid: path})
      }
    }
  })

  // Load repos for dashboard
  // api.loadSource(async ({ getCollection, store }) => {
  //   const repositoriesCollection = getCollection('Repository')
  //   const releasesCollection = getCollection('Release')
  //   const topicsCollection = getCollection('Topic')
  //   const repos = await getAllTh2NetRepos()
  //   for (const repository of repos) {
  //     const releases = await getRepoReleases(repository)
  //     for (const release of releases){
  //       releasesCollection.addNode(release)
  //     }
  //     repository.releases = releases.map(r => store.createReference('Release', r.id))
  //     for (const topic of repository.topics) {
  //       topicsCollection.addNode({ id: topic, title: topic })
  //     }
  //     repository.topics = repository.topics.map(t => store.createReference('Topic', t))
  //     repositoriesCollection.addNode(repository)
  //   }
  // })

  // Calculate data for dashboard
  api.loadSource(({ getCollection }) => {
    const repositoriesCollection = getCollection('Repository')
    const releasesCollection = getCollection('Release')
    const topicsCollection = getCollection('Topic')
    const repositories = repositoriesCollection._collection.data.map(repo => {
      return {
        ...repo,
        releases: repo.releases.map(r => releasesCollection.getNodeById(r.id)),
        topics: repo.topics.map(t => t.id)
      }
    })
    // TODO: optimize data for dashboard
    saveDashboardData({
      releasesFeed: getReleasesFeedRepos(repositories),
      families: getReposFamiliesByTopics(repositories, topicsCollection._collection.data.map(t => t.title))
    })
  })

  // Add th2 versions
  api.loadSource(({addCollection}) => {
    const versionsCollection = addCollection('Th2Version')
    for (const version of getDocumentedTh2Versions()){
      versionsCollection.addNode({ folder: version })
    }

  })

  // Construct content trees
  api.loadSource(({ getCollection }) => {
    const docPages = getCollection('DocPage')
      ._collection.data
      .filter(page => !page.path.startsWith('/versions') && !page.path.startsWith('/common'))
      .map(page => ({
        title: page.title,
        path: page.path,
        weight: page.weight
      }))
    const dashboardPages = getCollection('Th2Version')
      ._collection.data
      .map(v => ({
        title: 'Dashboard',
        path: `/${v.folder}/boxes/dashboard/`,
        weight: -1000
      }))

    savePagesTrees([...docPages, ...dashboardPages])
  })

  // Add metadata
  api.loadSource(({addMetadata}) => {
    addMetadata('githubRepoLink', 'https://github.com/th2-net/th2-docs',)
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })


}
