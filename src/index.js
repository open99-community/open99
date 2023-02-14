import fsApi from "./fs/fs.js";
import fsTask from "./boot/tasks/fs.js";

window.sys41 = {
    fsApi
}

await fsTask()