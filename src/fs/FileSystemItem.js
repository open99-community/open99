/**
 * file system item (should be extended)
 */
const FileSystemItem = class {
    /**
     * creates an entry in the idb
     * @param {Object} arg
     * @param {string} arg.path Path to item
     * @param {*} arg.content Item content
     */
    constructor({
        path,
        content
    }){
        this.path = path
        this.content = content
    }
    save(){
        
    }
}

export default FileSystemItem