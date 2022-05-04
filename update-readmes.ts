import axios from 'axios'
import fs from 'fs'
import yaml from 'js-yaml'

const getReadme = async (repo: string, user: string = 'th2-net'): Promise<string> => {
  const { data: readme } = await axios.get(`https://raw.githubusercontent.com/${user}/${repo}/master/README.md`)
  return readme
}

const getMarkdownHeaders = (md: string): any => {
  const headersRaw = md.match(/(---)[\w\W]*(---)/)
  if (!headersRaw) return
  const headers = yaml.loadAll(headersRaw[0])[0]
  return headers
}

const addReadmeToDoc = async (path: string) => {
  console.log(`Adding README to ${path}`)
  const autoReadmeRegExp = new RegExp(/<!--auto-readme-start-->[\w\W]*<!--auto-readme-end-->/)
  let mdDoc = fs.readFileSync(path, 'utf-8')
  const isReadmeExist: boolean = !!(mdDoc.match(autoReadmeRegExp))
  const headers = getMarkdownHeaders(mdDoc)
  if (!headers) return
  if (isReadmeExist){
    mdDoc = mdDoc.replace(autoReadmeRegExp, '<!--auto-readme-start-->\n<!--auto-readme-end-->')
  }
  try {
    const readme  = await getReadme(headers.repo, headers.repo_owner)
    if (!isReadmeExist){
      fs.writeFileSync(path,
`${mdDoc}
<!--auto-readme-start-->
${processParsedReadme(readme)}
<!--auto-readme-end-->`
      )
    } else {
      fs.writeFileSync(path, mdDoc.replace(autoReadmeRegExp,
`<!--auto-readme-start-->
${processParsedReadme(readme)}
<!--auto-readme-end-->`
        )
      )
    }

  } catch(e){
    return
  }
}

const processParsedReadme = (md: string): string => {
  return md
    .replaceAll('\n### ', '\n#### ')
    .replaceAll('\n## ', '\n### ')
    .replaceAll('\n# ', '\n## ')
}

const getBoxesPaths = ():string[] => {
  const paths: string[] = []
  function addAllMdFilesFromFolder(folder: string){
    try{
      paths.push(...fs.readdirSync(folder)
        .filter(f => !f.startsWith('_index'))
        .filter(f => f.endsWith('.md'))
        .map(f => `${folder}/${f}`))
    } catch(e){}
  }
  // Add common boxes pages
  addAllMdFilesFromFolder('./content/common/boxes/exactpro')
  addAllMdFilesFromFolder('./content/common/boxes/community')
  // Add boxes pages from each version
  fs.readdirSync('./content/versions')
    .filter(f => !f.endsWith('.md'))
    .forEach(versionFolder => {
      addAllMdFilesFromFolder(`./content/versions/${versionFolder}/boxes/exactpro`)
      addAllMdFilesFromFolder(`./content/versions/${versionFolder}/boxes/community`)
    })
  return paths
}

async function main(){
  console.log('Starting updating READMEs...')
  const boxesPaths: string[] = getBoxesPaths()
  console.log('Boxes pages found: ', boxesPaths)
  await Promise.all(boxesPaths.map(async (path) => await addReadmeToDoc(path)))
}

main()
