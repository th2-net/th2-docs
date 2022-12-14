/**
 * This plugin wraps tables generated from Markdown into styled block.
 *
 * !!! Remark dependencies can't be updated to be compatible with Gridsome.
 *
 * @param options
 * @returns {function(*): *}
 */
module.exports = (options = {}) => (tree: any) => {
  const visit = require('unist-util-visit')
  const toHTML = require('hast-util-to-html')
  const toHast = require('mdast-util-to-hast')
  const h = require('hastscript')
  const u = require('unist-builder')

  function wrapTable(tableNode: any){
    const wrappedTable =
      h('div',{ className: ['v-data-table', 'v-sheet', 'v-sheet--outlined', 'my-5']},
          [
            h('div', { className: 'v-data-table__wrapper' }, [toHast(tableNode)])
          ])
    const unistNode = u('html', toHTML(wrappedTable, { allowDangerousHTML: true }) )
    return unistNode
  }

  // Format tables
  visit(tree, 'table', (tableNode: any, index: number, parent: any) => {
    parent.children.splice(index, 1, wrapTable(tableNode))
  })
  return {...tree}
}
