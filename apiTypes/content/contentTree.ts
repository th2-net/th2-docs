export type ContentNode = {
  path: string,
  title: string,
  children?: ContentNode[]
}

export type ContentTree = ContentNode[]
