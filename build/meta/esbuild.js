import copy from "esbuild-copy-plugin"
import {config} from "dotenv"

config()

export function args(){
    return {
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
        loader: {".zip": "file"},
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
}