import { build as beforeClean} from "./beforeClean.js"
import { build as kernel } from "./kernel.js"
import { build as target_fs } from "./target_fs.js"
import { build as installer_fs } from "./installer_fs.js"
import { build as minifyHtml } from "./minifyHtml.js"
import { build as afterClean} from "./afterClean.js"

// THIS IS ORDER SENSITIVE! DO NOT CHANGE THE ORDER OF THIS ARRAY!
export default [
    beforeClean, //clean should ALWAYS go first
    target_fs,
    installer_fs,
    kernel,
    minifyHtml,
    afterClean
]