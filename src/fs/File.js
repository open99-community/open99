import FileSystemItem from "./FileSystemItem.ts"

class File extends FileSystemItem {
    constructor({
        name,
        path,
        content
    }){
        super({name, path, content})
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