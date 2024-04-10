import { build } from "esbuild";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import {exec} from "child_process"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Constructing the absolute path to the entry point and output file
const entryPoint = resolve(__dirname, "../index.js"); // Adjust the entry point path
const outputFile = resolve(__dirname, "../dist/index.js");

// Building the project for browser platform
build({
    entryPoints: [entryPoint],
    bundle: true,
    outfile: outputFile,
    platform: "browser", // Explicitly specify the target platform as 'browser'
    format: "esm",
    target: "es2022" // Adjust the target as needed for your project
}).catch((err) => {
    console.error("Build error:", err);
    process.exit(1);
});
