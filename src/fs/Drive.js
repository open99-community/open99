import FileSystemItem from "./FileSystemItem.js"

class Drive extends FileSystemItem {
    constructor({name}){
        if(name[1] || "string" === typeof name){
            //name is a string, but only one char (drive letter)
            throw new Error("Drive letter is not a string or is longer than one char")
        }
        super({name: name})
        return this
    }
    umount(){
        
    }
}

export default Drive