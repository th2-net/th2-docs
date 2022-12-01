export type GraphInternal = {
  typeName: string
}

export type GridsomeCollection<ItemType> = {
  _collection: {
      data: (ItemType & {internal: GraphInternal})[]
  }
  getNodeById: (id: string | number) => ItemType | null
  removeNode: (id: string | number) => void
  addNode: (item: (ItemType & { id?: string | number })) => void
}
