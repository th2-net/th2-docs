import axios from 'axios'
import fs from 'fs'
import yaml from 'js-yaml'

const getReadme = async (repo: string, user: string = 'th2-net'): Promise<string | undefined> => {
  try {
    const { data: readme } = await axios.get(`https://raw.githubusercontent.com/${user}/${repo}/master/README.md`)
  return readme
  } catch (e){
    return
  }
}

const getMarkdownHeaders = (md: string): any => {
  const headersRaw = md.match(/(---)[\w\W]*(---)/)
  if (!headersRaw) return
  const headers = yaml.loadAll(headersRaw[0])[0]
  return headers
}

const addReadmeToDoc = async (path: string) => {
  const mdDoc = fs.readFileSync(path, 'utf-8')
  const headers = getMarkdownHeaders(mdDoc)
  if (!headers) return
  try {
    const readme  = await getReadme(headers.repo, headers.repo_owner)
    fs.writeFileSync(path,
`${mdDoc}
<!--auto-readme-start-->
${readme}
<!--auto-readme-end-->`
      )
  } catch(e){
    return
  }
}

async function main(){
  console.log('Starting updating READMEs...')
  await addReadmeToDoc('./content/versions/1-5-4/boxes/exactpro/check2-recon.md')
}

main()
