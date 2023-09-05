import File from "./classes/File.js"
import Dir from "./classes/Dir"
import Drive from "./classes/Drive"

const fsApi = {
    async createFile({
        name,
        path,
        content
    }){
        return new File({name, path, content})
    },
    async createDir({
        name,
        path
    }){
        return new Dir({name, path})
    },
    async createDrive({
        name
    }){
        return new Drive({name})
    }
}

export default fsApi