import { rimraf } from "rimraf";
import { context, build as esbuild } from "esbuild";
import JavascriptObfuscator from "javascript-obfuscator"; //remember this is CommonJS so its wonky
import { promises as fs } from "fs"
import {args} from "../meta/esbuild.js"
export async function build({session, isWatchMode, NODE_ENV}) {
    const msg = session.addItem("Kernel")
    // if (!isWatchMode) {
        try {
            await esbuild(args())
            if (NODE_ENV !== "development") {
                const obfuscated = JavascriptObfuscator.obfuscate(await fs.readFile("./dist/index.js", {encoding:"utf8"}))
                await fs.writeFile("./dist/index.js", obfuscated.getObfuscatedCode())
                msg.addItem("Obfuscated", "success")
            }
            msg.addItem("Built", "success")
        } catch (e) {
            // First, we'll just remove the directory to begin with
            await rimraf("./dist")
            // error handling
            msg.addItem("Kernel build failed! Details below", "error")
            console.error(e)
            process.exit(1)
        }
    // } else {
    //    //@TODO implement watch mode
    //    msg.addItem("WATCH MODE NOT IMPLEMENTED", "error")
    //    process.exit(1)
    // }
}