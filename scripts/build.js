import zippy from "file-zippy"
import {build, context} from "esbuild"
import copy from "esbuild-copy-plugin"
import {config} from "dotenv"
import { buildTargetFs, buildInstallerFs } from "./fsbuild.js"
import { rimraf } from "rimraf"

config()

const content = {
    entryPoints: ["./src/index.js"],
    bundle: true,
    minify: true,
    sourcemap: process.env.NODE_ENV === "development",
    target: ["esnext"],
    outfile: "./dist/index.js",
    plugins: [copy({
        from: "./public",
        to: ".",
    })],
    platform: "browser",
    format: "esm",
    loader: { ".zip": "file"},
    define: {
        "process.env.NODE_ENV": "\"" + process.env.NODE_ENV + "\"" || "production",
        "SYSVER": `"${process.env.npm_package_version}"`,
    },
    legalComments: "none", //we don't want people to know what dependencies we rely on
    drop: process.env.NODE_ENV === "development" ? undefined : [
        "debugger",
        "console",
    ],
    banner: {
        js: `/*
 * OPEN99 - A simple, fast and secure web operating system.
 * Copyright stretch07, 2023, All rights reserved.
 * Copying this project is prohibited.
*/`,
    }
}
let isDevMode = false
process.argv.forEach(arg => {
    if (arg === "--watch") {
        isDevMode = true
    }
})

console.log("🧹 Cleaning up previous build...")
await rimraf("../dist")
await rimraf("../target_fs_BUILD")
await rimraf("../installer_fs_BUILD")
console.log("\t\t✅  Cleaned up!")


console.log(`🌌 Starting ${process.env.NODE_ENV} build... ${!isDevMode ? "👓 Watch off" : "👓 Watch on"}\n\t🛠️Building target fs...`)
await buildTargetFs()

console.log("\t\t✅  Target fs built!\n\t📦 Packing target fs...")
zippy("target_fs_BUILD/", "./public/assets/rootfs.zip")

console.log("\t\t✅  Target fs packed!\n\t🛠️Building installer fs...")
await buildInstallerFs()

console.log("\t\t✅  Installer fs built!\n\t📦 Packing installer fs...")
zippy("installer_fs_BUILD/", "./public/assets/installerfs.zip")

console.log("\t\t✅  Installer fs packed!\n\t🍿 Building kernel...")
if (!isDevMode) {
    try {
        await build(content)
        if (process.env.NODE_ENV !== "development") {
            console.log("Obfuscating...")
            //const obfuscated = JavascriptObfuscator.obfuscate(await target_fs.readFile("./dist/index.js", {encoding:"utf8"}))
            //await target_fs.writeFile(obfuscated.getObfuscatedCode(), "./dist/index.js")
        }
        console.log("\t\t✅  Kernel built!\n✅  Build complete!")
        process.exit(0)
    } catch (e) {
        console.log("Kernel build failed! Details below")
        console.error(e)
        process.exit(1)
    }
} else {
    const ctx = await context(content)
    const {port} = await ctx.serve({servedir: "./dist"})
    console.log("\t\t✅  Kernel built!\n👓 Watching!")
    console.log(`🍽️Serving on https://localhost:${port}. Press Ctrl+C to stop.`)
    await ctx.watch()
}

//@TODO make the fs zips stop appearing in /public/assets. they should be in /dist/assets