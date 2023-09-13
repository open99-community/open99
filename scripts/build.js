import tasks from "./tasks/index.js"
import { LogSession} from "portalog"
import copy from "esbuild-copy-plugin";
import { config } from "dotenv"
config()

const build_options = {
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

const session = new LogSession
const logger = session.addItem(`PLUTO OS building on ${new Date()}\nin ${process.env.NODE_ENV} mode. Watch mode is ${process.argv.includes("--watch") ? "on" : "off"}`, "🌌")
const args = [
    logger,
    process.argv.includes("--watch"),
    process.env.NODE_ENV,
    build_options
]
for (const task of tasks) {
    await task(...args)
}