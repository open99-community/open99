import FileSystemItem from "./FileSystemItem"

class Dir extends FileSystemItem {
    constructor(params: {path: string}) {
        super({path: params.path, content: ""})
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