import FileSystemItem from "./FileSystemItem.js";

class Dir extends FileSystemItem {
    constructor({
        name,
        path
    }){
        super({name, path})
        return this
    }
    rename(){

    }
    delete(){

    }
    fullDelete(){

    }
}

export default Dir