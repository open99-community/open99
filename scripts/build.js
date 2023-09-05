import zippy from "file-zippy"
import {build, context} from "esbuild"
import copy from "esbuild-copy-plugin"
import {config} from "dotenv"
import JavascriptObfuscator from "javascript-obfuscator"
import fs from "fs/promises"

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

console.log(`🌌 Starting ${process.env.NODE_ENV} build... ${!isDevMode ? "👓 Watch off" : "👓 Watch on"}\n\t📦 Packing target fs...`)

zippy("fs/", "./public/assets/rootfs.zip")

console.log("\t\t✅  Target fs packed!\n\t🍿 Building kernel...")
if (!isDevMode) {
    try {
        await build(content)
        if (process.env.NODE_ENV !== "development") {
            console.log("Obfuscating...")
            //const obfuscated = JavascriptObfuscator.obfuscate(await fs.readFile("./dist/index.js", {encoding:"utf8"}))
            //await fs.writeFile(obfuscated.getObfuscatedCode(), "./dist/index.js")
        }
        console.log("\t\t✅  Kernel built!\n✅ Build complete!")
        process.exit(0)
    } catch (e) {
        console.log("Kernel build failed! Details below")
        console.error(e)
        process.exit(1)
    }
} else {
    const ctx = await context(content)
    const {host, port} = await ctx.serve({servedir: "./dist"})
    console.log("\t\t✅ Kernel built!\n👓 Watching!")
    console.log(`🍽️Serving on ${host}:${port}`)
    await ctx.watch()
}