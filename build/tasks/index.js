import { build as clean} from "./clean.js"
import { build as kernel } from "./kernel.js"
import { build as target_fs } from "./target_fs.js"
import { build as installer_fs } from "./installer_fs.js"

// THIS IS ORDER SENSITIVE! DO NOT CHANGE THE ORDER OF THIS ARRAY!
export default [
    clean, //clean should ALWAYS go first
    kernel,
    target_fs,
    installer_fs, //@TODO add clean last so that *_BUILD directories are removed
]