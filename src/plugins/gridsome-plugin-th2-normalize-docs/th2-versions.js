const fs = require("fs");
module.exports.getDocumentedTh2Versions = function() {
    const versions = fs.readdirSync('./content/docs/versions')
    return versions.filter(line => !line.endsWith('.md'))
}
