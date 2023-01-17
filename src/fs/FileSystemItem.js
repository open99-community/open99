/**
 * file system item (should be extended)
 * @class
 */
const FileSystemItem = class {
    constructor({
        name,
        path
    }){
        this.name = name
        this.path = path
    }
}

export default FileSystemItem