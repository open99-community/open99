import { rimraf } from "rimraf";
import { context, build as esbuild } from "esbuild";

export async function build(session, isWatchMode, NODE_ENV, build_options) {
    const msg = session.addItem("Building kernel...", "🛠️")

    if (!isWatchMode) {
        try {
            await esbuild(build_options)
            if (NODE_ENV !== "development") {
                //console.log("Obfuscating kernel...")
                // wow this doesnt seem to work... @TODO do file splitting (split dependencies and kernel into separate files and obfuscate only the kernel)
                //const obfuscated = JavascriptObfuscator.obfuscate(await target_fs.readFile("./dist/index.js", {encoding:"utf8"}))
                //await target_fs.writeFile(obfuscated.getObfuscatedCode(), "./dist/index.js")
            }
            msg.addItem("Kernel built!", "✅")
        } catch (e) {
            // First, we'll just remove the directory to begin with
            await rimraf("../dist")
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