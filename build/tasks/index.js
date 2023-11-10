import { build as clean} from "./clean.js"
import { build as kernel } from "./kernel.js"
import { build as target_fs } from "./target_fs.js"
import { build as installer_fs } from "./installer_fs.js"
import { build as minifyHtml } from "./minifyHtml.js"

// THIS IS ORDER SENSITIVE! DO NOT CHANGE THE ORDER OF THIS ARRAY!
export default [
    clean, //clean should ALWAYS go first
    target_fs,
    installer_fs,
    kernel,
    minifyHtml,
    clean
]