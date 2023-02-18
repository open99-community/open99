import fsApi from "./fs/fs.js";
import fsTask from "./boot/fs.js";

window.sys41 = {
    fs: fsApi,
    _db: await fsTask()
}

await fsTask()