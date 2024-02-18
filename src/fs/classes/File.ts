import FileSystemItem from "./FileSystemItem"
type args = {
    path: string,
    content?: string | Blob | undefined
}

class File extends FileSystemItem {
    constructor(args: args) {
        super(args)
    }
    async save(){
        return this
    }
    delete(){

    }
    fullDelete(){
        
    }
    rename(){

    }
    fullRename(){

    }
    changeExt(){

    }
    changeType(){

    }
}

export default File