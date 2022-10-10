import { readFileSync, readdirSync, lstatSync } from 'fs'
import 'dotenv/config'

const FORBIDDEN_EXPRESSIONS = process.env.FORBIDDEN_EXPRESSIONS?.split('\n') || []

let excludedFiles = [
  /package(-lock)?.json/,
  /tsconfig*.json/,
  '.env',
  /.(png|ico|tff|ttf|jar|woff|woff2|cfg)/
]

let excludedFolders = [
  'node_modules',
  '.git'
]

function createForbiddenRegExs(words: string[]){
  return words.map(word => {
    let wordChanged = word
    let flags = ''
    if (wordChanged.includes('(?i)')){
      wordChanged = wordChanged.replace('(?i)', '')
      flags += 'i'
    }
    return new RegExp(wordChanged, flags)
  })
}

function checkPath(path: string, rules: (string | RegExp)[]){
  for (let rule of rules){
    if (typeof rule === 'string') {
      if (path === rule) return true
    }
    else if (rule instanceof RegExp){
      if (rule.test(path)) return true
    }
  }
  return false
}

function forAllFiles(checkFileCallBack: (content: string) => boolean, folderPath: string = '.'){
  let currentFolder = readdirSync(folderPath)
    .filter(path => !checkPath(path, excludedFolders))
    .filter(path => !checkPath(path, excludedFiles))
  for (let path of currentFolder){
    let localPath = `${folderPath}/${path}`
    let stat = lstatSync(localPath)
    if (stat.isDirectory()){
      forAllFiles(checkFileCallBack, localPath)
    } else if (stat.isFile()){
      if (checkFileCallBack(readFileSync(localPath, { encoding: 'utf-8' })))
        throw new Error(`Forbidden content found in ${localPath}`)
    }

  }
}

const forbiddenRegExs = createForbiddenRegExs(FORBIDDEN_EXPRESSIONS)

forAllFiles((content: string) => {
  let changedContent = content.replaceAll('*', '').replaceAll('_', '')
  for (let regex of forbiddenRegExs) {
    if (regex.test(changedContent)) {
      return true
    }
  }
  return false
})

console.log('No unwelcome words found')