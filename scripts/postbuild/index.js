import handler from "serve-handler"
import http from "http"
import { cpSync } from "fs";
import * as path from "path"
import { zipExecutableFiles } from "./utils/fsbuild.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const KERNEL_LOCATION = "../src/dist/index.js"

cpSync("../../public", "../../dist", {recursive: true});

// Zip installer executables
zipExecutableFiles(
    path.join(__dirname, "../../", 'executables', 'installer'), 
    path.join(__dirname, "../../", "dist", "assets", 'installer.zip')
  );
  
  // Zip root executables
  zipExecutableFiles(
    path.join(__dirname, "../../", 'executables', 'root'), 
    path.join(__dirname, "../../", "dist", "assets", 'rootfs.zip')
  );

if (process.argv.includes("--watch")) {
    console.log("Starting server...", "info");
    (async () => {
        http.createServer((req, res) => {
            return handler(req, res, {
                public: "../../dist",
                cleanUrls: true,
            })
        }).listen(process.env.DEV_SERVER_PORT ?? 8000, async () => {
            const url = `http://localhost:${process.env.DEV_SERVER_PORT ?? 8000}`
            console.log(`Server running at ${url}`, "success")
        });
    })()
}