import copy from "esbuild-copy-plugin"
import {config} from "dotenv"
import {readFile} from "fs/promises"
config()
const json = JSON.parse(
    await readFile("./package.json", "utf-8")
);

export function args(){
    return {
        entryPoints: ["./src/index.js"],
        bundle: true,
        minify: true,
        sourcemap: process.env.NODE_ENV === "development",
        target: ["esnext"], //@TODO fix esbuild target
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
            "SYSVER": `"${json.version}"`,
        },
        legalComments: "none", //we don't want people to know what dependencies we rely on
        drop: process.env.NODE_ENV === "development" ? undefined : [
            "debugger",
            "console",
        ],
        banner: {
            js: `/*
 * PLUTO - A sophisticated, fast and secure web operating system.
 * Copyright stretch07, 2023, All rights reserved.
 * Copying this project is prohibited by law.
*/`,
        }
    }
}