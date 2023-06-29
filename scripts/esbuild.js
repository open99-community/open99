import esbuild from "esbuild"
import env from "esbuild-plugin-env"
import copy from "esbuild-copy-plugin"

await esbuild.build({
    entryPoints: ["./src/index.js"],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ["esnext", "node18"],
    outdir: "./dist",
    plugins: [env(), copy({
        from: "../public",
        to: "../dist",
    })],
    platform: "browser",
    format: "esm"
})