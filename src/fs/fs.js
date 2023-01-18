import File from "./File";
import Dir from "./Dir";

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
        return new Dir({name, path, content})
    }
}

export default fsApi