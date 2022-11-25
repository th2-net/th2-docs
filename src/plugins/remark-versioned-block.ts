module.exports = (options = {}) => (tree: any) => {
  const visit = require('unist-util-visit')

  visit(tree, 'html', (node: any, index: number, parent: any) => {

    function replaceDivToVersionedBlock(index: number){
      const divCopy = JSON.parse(JSON.stringify(parent.children[index]))
      if (divCopy.value.startsWith('</')) {
        divCopy.value = divCopy.value.replace('</div', '</versioned-block')
      } else {
        divCopy.value = divCopy.value.replace('<div', '<versioned-block')
      }
      parent.children.splice(index, 1, divCopy)
    }

    if (node.value?.match(/<div+[\s\w="-]+version=["']?([\w.]+)["']?/)) {
      let closingCounter = 1
      let nextNodeIndex = index
      while (closingCounter > 0){
        nextNodeIndex++
        const nextNode = parent.children[nextNodeIndex]
        if (nextNode.type === 'html'){
          if (nextNode.value.startsWith('</')){
            closingCounter--
          } else {
            closingCounter++
          }
        }
      }
      replaceDivToVersionedBlock(index)
      replaceDivToVersionedBlock(nextNodeIndex)
    }

  })
  return {...tree}
}
