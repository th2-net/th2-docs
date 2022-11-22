import * as fs from 'fs'
import axios from 'axios'

export function createFolder(path: string){
  fs.mkdirSync(path)
}

export function clearCache(){
  fs.rmSync('content/.cache', {recursive: true})
  createFolder('content/.cache')
  createFolder('content/.cache/readmes')
}

export function readDoc(path: string){
  return fs.readFileSync('content/docs/' + path, { encoding: 'utf-8' })
}

export function writeReadmeFile(path: string, content: string){
  const filePath = path.split('/')
  filePath.pop()
  const dirPath = filePath.join('/')
  fs.mkdirSync('content/.cache/readmes/' + dirPath, { recursive: true })
  fs.writeFileSync('content/.cache/readmes/' + path, content, { encoding: "utf-8" })
}

export async function getMarkdownFile(url: string){
  try {
    const { data: content } = await axios.get(url)
    return content
  } catch (e){

  }
}

export function processParsedReadme(md: string, readmePath: string): string {
  const globalRepositoryLink: string = readmePath.replace('README.md', '')
  const allRelativeLinks = [...md.matchAll(/\[[^\[\]]*\]\([\w-\.\/]+\)/g)].map(match => match[0])
  const allTagLikePlaceholders = [...md.matchAll(/(\<[\w-\.]+\>)/g)].map(match => match[0])
  let newMd = md.replace(/^\`\`\`/gm, '\n```\n')//.replace(/^\#+/gm,'$1#')
  allRelativeLinks
    .filter(link => !link.includes('http://') && !link.includes('https://'))
    .forEach(link => {
      console.log(link)
      newMd = newMd.replace(link, link.replace(/\]\(\s*\./, `](${globalRepositoryLink}`))
      newMd = newMd.replace(link, link.replace(/\]\(\s*/, `](${globalRepositoryLink}`))
    })
  allTagLikePlaceholders
    .filter(content => !content.includes('!--') && content !== '<br>')
    .filter(content => {
      const [contentBefore] = newMd.split(content)
      const snippetCount = contentBefore.split('\`\`\`').length - 1
      return snippetCount % 2 === 1
    })
    .forEach(content => {
      newMd = newMd.replace(content, content.replace('<', `<`).replace('>', `\\>`))
    })
  return newMd
}
