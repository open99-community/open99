import zippy from "file-zippy"
import { build } from "esbuild"
import env from "esbuild-plugin-env"
import copy from "esbuild-copy-plugin"
import {config} from "dotenv"
config()

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
})