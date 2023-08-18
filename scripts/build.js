import zippy from "file-zippy"
import { build } from "esbuild"
import copy from "esbuild-copy-plugin"
import {config} from "dotenv"
config()

console.log("Starting build...\nBuilding rootfs...")

zippy("fs/", "./public/assets/rootfs.zip")

console.log("Rootfs built!\nBuilding kernel...")
await build({
    entryPoints: ["./src/index.js"],
    bundle: true,
    minify: true,
    sourcemap: process.env.NODE_ENV === "development" ? true : false,
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
    legalComments: "none",
    drop: [
        process.env.NODE_ENV === "development" ? "" : "debugger",
        process.env.NODE_ENV === "development" ? "" : "console",
    ],
    banner: {
        js: `/*
 * OPEN99 - A simple, fast and secure web operating system.
 * Copyright stretch07, 2023, All rights reserved.
 * Copying this project is prohibited.
*/`,
    }
})
console.log("Build complete!")