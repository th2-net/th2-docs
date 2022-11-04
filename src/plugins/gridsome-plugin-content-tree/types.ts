export interface PageReduced {
    path: string
    title: string
    weight: number
}

export interface PageRaw extends PageReduced{
    'tree-title'?: string
    tree_title?: string
}

export interface TreeNode extends PageReduced{
    children: TreeNode[]
}
