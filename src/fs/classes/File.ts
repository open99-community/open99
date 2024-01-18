import FileSystemItem from "./FileSystemItem"

class File extends FileSystemItem {
    constructor({
        path,
        content
    }){
        super({path, content})
        return this
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