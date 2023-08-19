import zippy from "file-zippy"
import {build} from "esbuild"
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

console.log(`Starting build in "${process.env.NODE_ENV}" mode...\nPacking rootfs...`)

zippy("fs/", "./public/assets/rootfs.zip")

console.log("Rootfs packed!\nBuilding kernel...")
try {
    await build({
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
    })
} catch (e) {
    console.log("Kernel build failed! Details below")
    console.error(e)
    process.exit(1)
}
console.log("Build complete!")