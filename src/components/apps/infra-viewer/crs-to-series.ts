import {GraphSeriesOption} from 'echarts'

type GraphNodes = GraphSeriesOption['nodes']
type GraphLinks = GraphSeriesOption['links']
type GraphCategories = GraphSeriesOption['categories']

export function getCategories(crs: any): GraphCategories {
  const categories: GraphCategories = []
  if (crs.boxes) {
    crs.boxes.forEach((box: any) => {
      categories.push({
        name: box.spec.type
      })
    })
  }
  if (crs.core) {
    crs.core.forEach((box: any) => {
      categories.push({
        name: box.spec.type
      })
    })
  }
  return categories
}

export function getNodes(crs: any): any {
  const nodes: GraphNodes = []
  if (crs.boxes) {
    crs.boxes.forEach((box: any) => {
      nodes.push({
        category: box.spec.type,
        id: box.metadata.name,
        name: box.metadata.name,
        symbolSize: 5
      })
    })
  }
  if (crs.core) {
    crs.core.forEach((box: any) => {
      nodes.push({
        category: box.spec.type,
        id: box.metadata.name,
        name: box.metadata.name,
        symbolSize: 5
      })
    })
  }
  return  nodes
}

export function getLinks(crs: any): GraphLinks {
  const edges: GraphLinks = []
  if (crs.links) {
    crs.links.forEach((links: any) => {
      if (links?.spec && links.spec['boxes-relation'] && links.spec['boxes-relation']['router-grpc'])
        links.spec['boxes-relation']['router-grpc'].forEach((link: any) => {
          edges.push({
            id: link.name,
            source: link.from.box,
            target: link.to.box
          })
        })
      if (links?.spec && links.spec['boxes-relation'] && links.spec['boxes-relation']['router-mq'])
        links.spec['boxes-relation']['router-mq'].forEach((link: any) => {
          edges.push({
            id: link.name,
            source: link.from.box,
            target: link.to.box
          })
        })
    })
  }
  return edges
}
