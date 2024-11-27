import {rimraf} from "rimraf";
import {build as esbuild} from "esbuild";
import JavascriptObfuscator from "javascript-obfuscator"; //remember this is CommonJS so its wonky
import {promises as fs} from "fs"
import {args} from "../meta/esbuild.js"
import {obfuscateOptions} from "../meta/obfuscateOptions.js";

export async function build({NODE_ENV, realVersion}) {
    try {

        await esbuild(args(NODE_ENV, realVersion))
        if (NODE_ENV !== "development") {
            const obfuscated = JavascriptObfuscator.obfuscate(await fs.readFile("./dist/index.js", obfuscateOptions))
            await fs.writeFile("./dist/index.js", obfuscated.getObfuscatedCode())
            console.log("Obfuscated")
        }
    } catch (e) {
        // error handling
        console.log("Kernel build failed! Details below", "error")
        console.error(e)
        process.exit(1)
    }
}