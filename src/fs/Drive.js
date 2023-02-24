import FileSystemItem from "./FileSystemItem.js"

class Drive extends FileSystemItem {
    /**
     * 
     * @param {string} arg 
     * @param {string} arg.name
     * @returns 
     */
    constructor({name}){
        if((name[1]) || ("string" !== typeof name)){
            //name should be a string, but only one char (drive letter)
            throw new Error("Drive letter is not a string or is longer than one char")
        } else {
            super({path: name})
        }
    }
    umount(){
        
    }
}

export default Drive