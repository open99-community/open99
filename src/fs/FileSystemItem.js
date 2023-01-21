/**
 * creates an entry
 * @class
 * @classdesc file system item (should be extended)
 */
const FileSystemItem = class {
    constructor({
        name,
        path,
        content
    }){
        this.name = name
        this.path = path
        this.content = content
    }
    save(){
        
    }
}

export default FileSystemItem