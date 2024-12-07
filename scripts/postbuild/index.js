import handler from "serve-handler";
import http from "http";
import { cpSync } from "fs";
import * as path from "path";
import { zipExecutableFiles } from "./utils/fsbuild.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const KERNEL_LOCATION = "./src/dist/index.js";

cpSync("./public", "./dist", { recursive: true });
cpSync(KERNEL_LOCATION, "./dist/index.js");
if (process.env.NODE_ENV !== "production") {
  cpSync(KERNEL_LOCATION + ".map", "./dist/index.js.map");
}

// Zip installer executables
let {bytes: installerBytes} = await zipExecutableFiles(
  path.join("executables", "installer"),
  path.join("dist", "assets", "installer.zip")
);

// Zip root executables
let {bytes: rootBytes} = await zipExecutableFiles(
  path.join("executables", "root"),
  path.join("dist", "assets", "rootfs.zip")
);

if (installerBytes === 0 || rootBytes === 0) {
    console.log("Build failed, no executables");
    process.exit(1);
}

if (process.argv.includes("--watch")) {
  console.log("Starting server...", "info");
  (async () => {
    http
      .createServer((req, res) => {
        return handler(req, res, {
          public: "./dist",
          cleanUrls: true,
        });
      })
      .listen(process.env.DEV_SERVER_PORT ?? 8000, async () => {
        const url = `http://localhost:${process.env.DEV_SERVER_PORT ?? 8000}`;
        console.log(`Server running at ${url}`, "success");
      });
  })();
}
