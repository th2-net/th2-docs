module.exports = (options = {}) => (tree: any) => {
  const u = require('unist-builder')
  const h = require('hastscript')
  const visit = require('unist-util-visit')

  visit(tree, 'code', (codeNode: any, index: number, parent: any) => {
      if (!codeNode?.lang)
        codeNode.lang = 'shell'
  })
  return {...tree}
}