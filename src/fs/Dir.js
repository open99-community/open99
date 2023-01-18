import FileSystemItem from "./FileSystemItem";

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