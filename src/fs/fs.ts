import File from "./classes/File.js"
import Dir from "./classes/Dir"
import Drive from "./classes/Drive"
type fileArgs = {
    name: string,
    path: string,
    content: string
}
type dirArgs = {
    path: string
}
type driveArgs = {
    name: string
}

const fsApi = {
    async createFile(args: fileArgs){
        return new File(args)
    },
    async createDir(args: dirArgs){
        return new Dir(args)
    },
    async createDrive(args: driveArgs){
        return new Drive(args)
    }
}

export default fsApi