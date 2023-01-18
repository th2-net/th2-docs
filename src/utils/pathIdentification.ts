export const isMainModulePage = (path: string) => {
  return path.startsWith('/modules/') && path.split('/').length === 4
}

export const isModulePage = (path: string) => {
  return path.startsWith('/modules/') && path.split('/').length >= 4
}
