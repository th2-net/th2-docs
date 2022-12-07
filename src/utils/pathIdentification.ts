export const isMainModulePage = (path: string) => {
  return path.startsWith('/explore/modules/') && path.split('/').length === 5
}

export const isModulePage = (path: string) => {
  return path.startsWith('/explore/modules/') && path.split('/').length >= 5
}
