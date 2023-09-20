import { rimraf } from "rimraf";
import { context, build as esbuild } from "esbuild";
import JavascriptObfuscator from "javascript-obfuscator";
import { promises as fs } from "fs"
import {args} from "../meta/esbuild.js"

export async function build({session, isWatchMode, NODE_ENV}) {
    const msg = session.addItem("Building kernel...", "🛠")
    if (!isWatchMode) {
        try {
            await esbuild(args())
            if (NODE_ENV !== "development") {
                msg.addItem("Obfuscating kernel...", "🕶")
                const obfuscated = JavascriptObfuscator.obfuscate(await fs.readFile("./dist/index.js", {encoding:"utf8"}))
                await fs.writeFile("./dist/index.js", obfuscated.getObfuscatedCode())
                msg.addItem("Kernel obfuscated!", "✅")
            }
            msg.addItem("Kernel built!", "✅")
        } catch (e) {
            // First, we'll just remove the directory to begin with
            await rimraf("./dist")
            // error handling
            msg.addItem("Kernel build failed! Details below", "❌")
            console.error(e)
            process.exit(1)
        }
    } else {
        //@TODO implement watch mode
        msg.addItem("WATCH MODE NOT IMPLEMENTED", "❌")
        process.exit(1)
    }
}