import {GraphSeriesOption, TooltipComponentFormatterCallback} from 'echarts'

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
    crs.boxes.forEach((box) => {
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
    crs.boxes.forEach((box) => {
      nodes.push({
        category: box.spec.type,
        id: box.metadata?.name,
        name: box.metadata?.name,
        symbolSize: 5
      })
    })
  }
  if (crs.core) {
    crs.core.forEach((box) => {
      nodes.push({
        category: box.spec.type,
        id: box.metadata?.name,
        name: box.metadata?.name,
        symbolSize: 5
      })
    })
  }
  return  nodes
}

export function getLinks(crs: CRs, options: {
  estore?: boolean
  mstore?: boolean
} = {}): GraphLinks {
  const edges: GraphLinks = []
  if (crs.links) {
    crs.links.forEach((links: any) => {
      if (links?.spec && links.spec['boxes-relation'] && links.spec['boxes-relation']['router-grpc'])
        links.spec['boxes-relation']['router-grpc'].forEach((link: any) => {
          edges.push({
            id: link.name,
            source: link.from.box,
            target: link.to.box,
            lineStyle: {
              color: 'blue'
            }
          })
        })
      if (links?.spec && links.spec['boxes-relation'] && links.spec['boxes-relation']['router-mq'])
        links.spec['boxes-relation']['router-mq'].forEach((link: any) => {
          edges.push({
            id: link.name,
            source: link.from.box,
            target: link.to.box,
            lineStyle: {
              color: 'red'
            }
          })
        })
    })
  }
  if (crs.boxes){
    const estore = options.estore ? crs.core?.find(b => b.kind === 'Th2Estore') : undefined
    const mstore = options.mstore ? crs.core?.find(b => b.kind === 'Th2Mstore') : undefined
    crs.boxes.forEach(box => {
      if (estore)
        edges.push({
          source: box.metadata?.name,
          target: estore.metadata?.name,
          lineStyle: {
            color: 'violet',
            type: 'dashed'
          }
        })
      if (mstore)
        edges.push({
          source: box.metadata?.name,
          target: mstore.metadata?.name,
          lineStyle: {
            color: 'orange',
            type: 'dashed'
          }
        })
    })
  }
  return edges
}

export function createFormatter(crs: CRs): TooltipComponentFormatterCallback<any>{
  return function (params) {
    console.log(params)
    const dataType: string = params.dataType
    if (dataType === 'node') {
      const box = crs.boxes?.find(b => b.metadata?.name === params.data.id) ??
        crs.core?.find(b => b.metadata?.name === params.data.id)
      console.log(box)
      if (box){
        const mqPins = box.spec.pins
          ?.filter(p => p["connection-type"].startsWith('mq'))
          .map(p => '<li><code>' + p.name + '</code></li>')
        const grpcPins = box.spec.pins
          ?.filter(p => p["connection-type"].startsWith('grpc'))
          .map(p => '<li><code>' + p.name + '</code></li>')
        return `
        <b>${params.data.name}</b></br>
        kind: <code>${box.kind}</code></br>
        ${box.spec.type ? `type: <code>${box.spec.type}</code></br>` : ''}
        ${mqPins?.length ? `mq pins: <ul>${mqPins.join(' ')}</ul>`: ''}
        ${grpcPins?.length ? `grpc pins: <ul>${grpcPins.join(' ')}</ul>`: ''}`
      }
    }
    if (dataType === 'edge'){
      const findLinkCallback = (linkCR: Th2LinkCR) => {
        if (linkCR.spec['boxes-relation']){
          if (linkCR.spec['boxes-relation']['router-mq']){
            const result = linkCR.spec['boxes-relation']['router-mq']
              .find(link => link.from.box === params.data.source && link.to.box === params.data.target)
            if (result) {
              return {
                link: result,
                type: 'mq'
              }
            }
          }
          if (linkCR.spec['boxes-relation']['router-grpc']){
            const result = linkCR.spec['boxes-relation']['router-grpc']
              .find(link => link.from.box === params.data.source && link.to.box === params.data.target)
            if (result) {
              return {
                link: result,
                type: 'grpc'
              }
            }
          }
        }
        return {link: undefined, type: undefined}
      }
      const linksCR = crs.links?.find(cr => findLinkCallback(cr).link)
      if (linksCR){
        const {link, type} = findLinkCallback(linksCR)
        if (link){
          return `
            <b>${params.data.id}</b></br>
            type: <code>${type}</code></br>
            <code>${link.from.box}:${link.from.pin}</code> > <code>${link.to.box}:${link.to.pin}</code></br>
          `
        }
      }

    }
    return `
     <pre>${JSON.stringify(params.data, null, 2)}</pre>`
  }
}
