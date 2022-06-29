const h = require('hastscript')
const u = require('unist-builder')
const visit = require('unist-util-visit')
const toHTML = require('hast-util-to-html')
const toHast = require('mdast-util-to-hast')


module.exports = (options = {}) => tree => {
  // Format tables
  visit(tree, 'table', (tableNode, index, parent) => {
    parent.children.splice(index, 1, wrapTable(tableNode))
  })
  return {...tree}
}

function wrapTable(tableNode){
  const wrappedTable = h('div', { className: ['v-sheet', 'v-sheet--outlined', 'elevation-2']}, [
    h('div',{ className: 'v-data-table'},
        [
          h('div', { className: 'v-data-table__wrapper' }, [toHast(tableNode)])
        ]
    )
  ])
  const unistNode = u('html', toHTML(wrappedTable, { allowDangerousHTML: true }) )
  return unistNode
}
