export const isMainSectionPage = (path: string) => {
  return !(path.split('/').filter(section => !!section).length > 1)
}

export const isMainModulePage = (path: string) => {
  return path.startsWith('/modules/') && path.split('/').length === 4
}

export const isModulePage = (path: string) => {
  return path.startsWith('/modules/') && path.split('/').length >= 4
}
