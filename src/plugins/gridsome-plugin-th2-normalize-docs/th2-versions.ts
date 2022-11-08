import * as fs from 'fs'
//const fs = require("fs");
export function getDocumentedTh2Versions() {
    const versions = fs.readdirSync('./content/docs/versions')
    return versions.filter((line:any) => !line.endsWith('.md'))
}
