import zippy from "file-zippy"
import esbuild from "esbuild"
import env from "esbuild-plugin-env"
import copy from "esbuild-copy-plugin"

zippy("fs/", "./public/assets/rootfs.zip")

await esbuild.build({
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
    //loader: {".zip": "copy"}
})