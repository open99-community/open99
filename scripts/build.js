import zippy from "file-zippy"
import {build, context} from "esbuild"
import copy from "esbuild-copy-plugin"
import {config} from "dotenv"

config()
let conditionals = {}
if (process.env.NODE_ENV === "development") {
    conditionals.drops = [
        "debugger",
        "console",
    ]
}
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
    define: {
        "process.env.NODE_ENV": "\"" + process.env.NODE_ENV + "\"" || "production",
    },
    legalComments: "none", //we don't want people to know what dependencies we rely on
    drop: conditionals.drops,
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
        console.log("WATCH MODE ON - CHANGES IN FS WILL NOT REBUILD. ONLY KERNEL CHANGES")
    }
})

console.log(`Starting build in "${process.env.NODE_ENV}" mode... ${!isDevMode ? "Filewatch off" : "Filewatch on"}\nPacking rootfs...`)

zippy("fs/", "./public/assets/rootfs.zip")

console.log("Rootfs packed!\nBuilding kernel...")
if (!isDevMode) {
    try {
        await build(content)
        console.log("Build complete!")
        process.exit(0)
    } catch (e) {
        console.log("Kernel build failed! Details below")
        console.error(e)
        process.exit(1)
    }
} else {
    const ctx = await context(content)
    console.log("Watching!")
    const {host, port} = await ctx.serve({servedir: "./dist"})
    console.log(`Serving on ${host}:${port}`)
    await ctx.watch()
}