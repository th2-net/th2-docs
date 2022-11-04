const u = require('unist-builder')
const h = require('hastscript')
const visit = require('unist-util-visit')


/**
 * This plugin adds copy code button to every code sample,
 * processed by remark-prism (https://github.com/sergioramos/remark-prism).
 *
 * !!! Remark dependencies can't be updated to be compatible with Gridsome.
 *
 * @param options
 * @returns {function(*): *}
 */
module.exports = (options = {}) => (tree: any) => {
    visit(tree, 'element', (codeNode: any, index: number, parent: any) => {
        if (codeNode?.properties?.className === 'remark-highlight')
            parent.children.splice(index, 1, addCopyCodeBtn(codeNode))
    })
    return {...tree}
}

function addCopyCodeBtn(codeNode: any){
    const newNode = {
        ...codeNode,
        data: {
          ...codeNode.data,
          hChildren: [
              ...codeNode.data.hChildren,
              h('copy-code-btn')
          ]
        },
        children: [ ...codeNode.children, u('html', '<copy-code-btn />')] }
    return newNode
}
