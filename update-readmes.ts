import axios from 'axios'
import fs from 'fs'
const {parseMarkdownHeaders} = require('markdown-headers')

const getReadme = async (path: string): Promise<string> => {
  if (!path.startsWith('https://raw.githubusercontent.com')) Error('Unreliable path to GitHub markdown file')
  //const { data: readme } = await axios.get(`https://raw.githubusercontent.com/${user}/${repo}/master/README.md`)
  const { data: readme } = await axios.get(path)
  return readme
}

const getMarkdownHeaders = (md: string): any => {
  const headers = parseMarkdownHeaders(md).headers
  return headers
}

function getReadmePathFromHeaders(headers: any): string | undefined{
  if (!!headers.repo && !!headers.repo_owner)
    return `https://raw.githubusercontent.com/${headers.repo_owner}/${headers.repo}/master/README.md`
  if (!!headers.readme_path)
    return headers.readme_path
  return
}

async function addReadmeToDoc(path: string){
  const autoReadmeRegExp = new RegExp(/<!--auto-readme-start-->[\w\W]*<!--auto-readme-end-->/)
  let mdDoc = fs.readFileSync(path, 'utf-8')
  const isReadmeExist: boolean = !!(mdDoc.match(autoReadmeRegExp))
  const headers = getMarkdownHeaders(mdDoc)
  if (!headers) return
  if (isReadmeExist){
    mdDoc = mdDoc.replace(autoReadmeRegExp, '<!--auto-readme-start-->\n<!--auto-readme-end-->')
  }
  try {
    const readmePath = getReadmePathFromHeaders(headers)
    if (!readmePath) return
    console.log(`Adding README to ${path}`)
    const readme  = await getReadme(readmePath)
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

const getPagesPaths = ():string[] => {
  const paths: string[] = []
  function addAllMdFilesFromFolder(folder: string){
    try{
      paths.push(...fs.readdirSync(folder)
        .filter(f => !f.startsWith('_index'))
        .filter(f => f.endsWith('.md'))
        .map(f => `${folder}/${f}`))
    } catch(e){ console.error(`Error during adding files: `, e, 'continuing...') }
  }
  function addAllMdFilesFromSubfolders(folder: string){
    try {
      fs.readdirSync(folder)
      .filter(f => !(f.endsWith('.md') || f.endsWith('.yaml') || f.endsWith('.json')))
      .forEach(subfolder => {
        addAllMdFilesFromFolder(`${folder}/${subfolder}`)
        addAllMdFilesFromSubfolders(`${folder}/${subfolder}`)
      })
    } catch (e) { console.error(`Error during reading subfolders: `, e, 'continuing...') }

  }
  addAllMdFilesFromFolder('./content/common')
  addAllMdFilesFromSubfolders('./content/common')
  addAllMdFilesFromFolder('./content/versions')
  addAllMdFilesFromSubfolders('./content/versions')
  return paths
}

async function main(){
  console.log('Starting updating READMEs...')
  const boxesPaths: string[] = getPagesPaths()
  console.log('Boxes pages found: ', boxesPaths)
  await Promise.all(boxesPaths.map(async (path) => await addReadmeToDoc(path)))
}

main()
