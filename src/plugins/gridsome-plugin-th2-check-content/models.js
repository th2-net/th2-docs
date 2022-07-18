module.exports.ContentToCheck = class ContentToCheck {
    nodeMeta = {
        typeName: '',
        id: ''
    }
    fieldName = ''
    content = ''

    constructor({nodeMeta = {typeName: '', id: ''},
                    content = '',
                    fieldName = ''}){
        this.nodeMeta = nodeMeta
        this.content = content
        this.fieldName = fieldName
    }
}

