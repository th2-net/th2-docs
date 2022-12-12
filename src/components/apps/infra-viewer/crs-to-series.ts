import {GraphSeriesOption} from 'echarts'

type GraphNodes = GraphSeriesOption['nodes']
type GraphLinks = GraphSeriesOption['links']
type GraphCategories = GraphSeriesOption['categories']

type K8sCR<T> = {
  kind: string
  metadata?: {
    name?: string
  }
  spec: T
}

type Th2BoxCR = K8sCR<{
  'image-name': string
  'image-version': string
  'custom-config'?: any
  type?: string
  pins: {
    name: string
    'connection-type': string
    attributes?: string[]
  }[]
}>

type Th2BoxLink = {
  name: string
  from: {
    box: string
    pin: string
  }
  to: {
    box: string
    pin: string
  }
}

type Th2LinkCR = K8sCR<{
  'boxes-relation'?: {
    'router-grpc'? : Th2BoxLink[]
    'router-mq'? : Th2BoxLink[]
  }
  'dictionaries-relation'?: {
    name: string
    box: string
    dictionary: {
      name: string
      type?: string
    }
  }[]
}>

export type CRs = {
  boxes?: Th2BoxCR[]
  core?: Th2BoxCR[]
  dictionaries?: K8sCR<{ data: string }>[]
  links?: Th2LinkCR[]
}

export function getCategories(crs: CRs): GraphCategories {
  console.log(crs)
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

export function getNodes(crs: CRs): GraphNodes {
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

export function getLinks(crs: CRs): GraphLinks {
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
