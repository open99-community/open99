import FileSystemItem from "./FileSystemItem.js"

/**
 * Drive class
 */
class Drive extends FileSystemItem {
    /**
     * Initializes new Drive
     * @param {string} arg 
     * @param {string} arg.name
     * @throws {Error}
     * @returns {this}
     */
    constructor({name}){
        if((name[1]) || ("string" !== typeof name)){
            //name should be a string, but only one char (drive letter)
            throw new Error("Drive letter is not a string or is longer than one char")
        } else {
            super({path: name})
            super.save()
        }
    }

    /**
     * Unmounts (removes) drive
     */
    async umount(){
        return await super.remove()
    }
}

export default Drive