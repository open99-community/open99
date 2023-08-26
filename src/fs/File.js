import FileSystemItem from "./FileSystemItem.ts"

class File extends FileSystemItem {
    constructor({
        path,
        content
    }){
        super({path, content})
        return this
    }
    save(){
        
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