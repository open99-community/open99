import FileSystemItem from "./FileSystemItem"

/**
 * Drive class
 */
class Drive extends FileSystemItem {
    /**
     * Initializes new Drive
     */
    name: string
    constructor(data: {name:string}){
        const name = data.name
        if((name[1]) || ("string" !== typeof name)){
            //name should be a string, but only one char (drive letter)
            throw new Error("Drive letter is not a string or is longer than one char")
        } else {
            super({path: name, content: ""})
        }
        data.name = this.name
    }

    /**
     * Unmounts (removes) drive
     */
    async umount(){
        return await super.remove()
    }
}

export default Drive