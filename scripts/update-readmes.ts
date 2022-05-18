import axios from 'axios'
import fs from 'fs'
const {parseMarkdownHeaders} = require('markdown-headers')

const GITHUB_USER_CONTENT_LINK = 'https://raw.githubusercontent.com'

async function getReadme(path: string): Promise<string>{
  if (!path.startsWith(GITHUB_USER_CONTENT_LINK)) throw new Error('Unreliable path to GitHub markdown file: ' + path)
  const { data: readme } = await axios.get(path)
  return readme
}

function getMarkdownHeaders(md: string): any {
  const headers = parseMarkdownHeaders(md).headers
  return headers
}

function getReadmePathFromHeaders(headers: any): string | undefined {
  if (!!headers.readme_path)
    return headers.readme_path
  if (!!headers.repo && !!headers.repo_owner)
    return `${GITHUB_USER_CONTENT_LINK}/${headers.repo_owner}/${headers.repo}/master/README.md`
  return
}

async function addReadmeToDoc(path: string){
  const autoReadmeRegExp = new RegExp(/<!--auto-readme-start-->.*<!--auto-readme-end-->/)
  let mdDoc = fs.readFileSync(path, 'utf-8')
  const isReadmeExist: boolean = !!mdDoc.match(autoReadmeRegExp)
  const headers = getMarkdownHeaders(mdDoc)
  if (!headers) return
  if (isReadmeExist){
    mdDoc = mdDoc.replace(autoReadmeRegExp, '<!--auto-readme-start-->\n<!--auto-readme-end-->')
  }
  if (headers.skip_readme) {
    fs.writeFileSync(path, mdDoc)
    return
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
${processParsedReadme(readme, readmePath)}
<!--auto-readme-end-->`
      )
    } else {
      fs.writeFileSync(path, mdDoc.replace(autoReadmeRegExp,
`<!--auto-readme-start-->
${processParsedReadme(readme, readmePath)}
<!--auto-readme-end-->`
        )
      )
    }
  } catch(e){
    console.error(e)
    return
  }
}

function processParsedReadme(md: string, readmePath: string): string {
  const globalRepositoryLink: string = readmePath.replace('README.md', '')
  const allImageLinks = [...md.matchAll(/\!\[[^\[\]]*\]\([^\(\)]*\)/g)].map(match => match[0])
  let newMd = md.replaceAll(/^\#+/gm,'$1#')
  allImageLinks
    .filter(link => !link.includes('http://') && !link.includes('https://'))
    .forEach(link => {
      newMd = newMd.replace(link, link.replace(/\]\(\s*/, `](${globalRepositoryLink}`))
    })
  return newMd
}

function getPagesPaths():string[] {
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
  const pagesPaths: string[] = getPagesPaths()
  console.log('Pages found: ', pagesPaths)
  await Promise.all(pagesPaths.map(async (path) => await addReadmeToDoc(path)))
}

main()
