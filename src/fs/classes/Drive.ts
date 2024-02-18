import FileSystemItem from "./FileSystemItem"

/**
 * Drive class
 * @TODO rewrite drive completely - should create object stores in indexedDB
 */
class Drive extends FileSystemItem {
    /**
     * Initializes new Drive
     */
    name: string
    constructor(data: {name:string}){
        super({path: data.name, content: ""})
        this.name = data.name
    }

    /**
     * Unmounts (removes) drive
     */
    async umount(){
        return await super.remove()
    }
}

export default Drive