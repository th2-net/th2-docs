const u = require('unist-builder')
const h = require('hastscript')
const visit = require('unist-util-visit')


module.exports = (options = {}) => tree => {
    visit(tree, 'element', (codeNode, index, parent) => {
        if (codeNode?.properties?.className === 'remark-highlight')
            parent.children.splice(index, 1, addCopyCodeBtn(codeNode))
    })
    return {...tree}
}

function addCopyCodeBtn(codeNode){
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
