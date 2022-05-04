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

async function main(){
  console.log('Starting updating READMEs...')
  await addReadmeToDoc('./content/versions/1-5-4/boxes/exactpro/check2-recon.md')
}

main()
