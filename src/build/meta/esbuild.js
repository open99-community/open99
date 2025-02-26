import copy from "esbuild-copy-plugin"
import {readFile} from "fs/promises"
const {author} = JSON.parse(
    await readFile("../package.json", "utf-8")
);

export function args(NODE_ENV, realVersion){
    process.env.NODE_ENV = NODE_ENV

    // Create define object with all process.env variables
    const define = {
        "process.env.NODE_ENV": "\"" + process.env.NODE_ENV + "\"" || "production",
        "$SYSVER": `"${realVersion}"`,
        "$SYSAUT": `"${author}"`
    };

    for (const [key, value] of Object.entries(process.env)) {
        define[`process.env.${key}`] = JSON.stringify(value);
    }

    if (process.env.NODE_ENV === "development") {
        //its ok to do this even when not in development, as it will be removed by esbuild
        define["process.env"] = JSON.stringify(process.env);
    }

    return {
        entryPoints: ["./index.ts"],
        bundle: true,
        minify: true,
        sourcemap: process.env.NODE_ENV === "development",
        target: ["esnext"], //@TODO fix esbuild target
        outfile: "./dist/index.js",
        platform: "browser",
        format: "esm",
        loader: {".zip": "file", ".css": "text"},
        define: define,
        legalComments: "none", //we don't want people to know what dependencies we rely on
        drop: process.env.NODE_ENV === "development" ? undefined : [
            "debugger",
            "console",
        ],
        banner: {   // ATTENTION: The Pluto Version Handler REQUIRES for the VERSION string to be exactly there. Do not modify
            js: `/*
 * PLUTO - A sophisticated, fast and secure web operating system.
 * VERSION ${realVersion}
 * Copyright ${author ?? "AUTHORS"}, ${new Date().getFullYear()}, All rights reserved.
 * Copying this project is prohibited by law.
*/`,
        }
    };
}