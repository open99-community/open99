import zippy from "file-zippy"
import { build } from "esbuild"
import env from "esbuild-plugin-env"
import copy from "esbuild-copy-plugin"
import {config} from "dotenv"
config()
console.log("Building...")

zippy("fs/", "./public/assets/rootfs.zip")

await build({
    entryPoints: ["./src/index.js"],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ["esnext", "node18"],
    outfile: "./dist/index.js",
    plugins: [env(), copy({
        from: "./public",
        to: ".",
    })],
    platform: "browser",
    format: "esm",
    define: {
        "process.env.NODE_ENV": "\"" + process.env.NODE_ENV + "\"" || "production",
    },
    banner: {
        js: `/*
 * OPEN99 - A simple, fast and secure web operating system.
 * Copyright stretch07, 2023, All rights reserved.
 * Copying this project is prohibited.
*/`,
    }
})
console.log("Build complete!")