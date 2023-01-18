import FileSystemItem from "./FileSystemItem";

class Dir extends FileSystemItem {
    constructor({
        name,
        path,
        content
    }){
        super({name, path, content})
    }
    rename(){

    }
    delete(){

    }
    fullDelete(){

    }
}

export default Dir