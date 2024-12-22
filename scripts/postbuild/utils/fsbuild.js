import * as fs from "fs";
import archiver from "archiver";
import * as path from "path";

export function zipExecutableFiles(baseDir, outputZipName) {
  return new Promise((resolve, reject) => {
    // Create a new archiver instance
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level
    });

    // Create a write stream to the output zip file
    const output = fs.createWriteStream(outputZipName);

    // Listen for archiving warnings
    archive.on("warning", function (err) {
      if (err.code === "ENOENT") {
        console.warn("Archiver warning:", err);
      } else {
        throw err;
      }
    });

    // Listen for archiving errors
    archive.on("error", function (err) {
      throw err;
    });

    // Pipe archive data to the output file
    archive.pipe(output);

    // Find and add files matching the pattern
    const findAndAddFiles = (currentPath) => {
      const files = fs.readdirSync(currentPath);

      files.forEach((file) => {
        const fullPath = path.join(currentPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {

          // AsmRuntime - Check for dist/release.wasm
          const releaseWasmPath = path.join(fullPath, "dist", "release.wasm");
          if (fs.existsSync(releaseWasmPath)) {
            const executableName = path.basename(fullPath);
            // Add the file to the archive
            archive.file(releaseWasmPath, { name: executableName + ".wasm" });

            // if it uses assemblyscript host bindings
            const bindingsWasmPath = path.join(fullPath, "dist", "release.js");
            if (fs.existsSync(bindingsWasmPath)) {
              // Add the file to the archive
              archive.file(bindingsWasmPath, { name: executableName + ".js" });
            }
          }

          // 41Worker - Check for dist/index.js
          const distIndexPath = path.join(fullPath, "dist", "index.js");
          if (fs.existsSync(distIndexPath)) {
            const executableName = path.basename(fullPath);
            // Add the file to the archive
            archive.file(distIndexPath, { name: executableName + ".js" });
          }
        }
      });
    };

    // Run the file finding and adding process
    findAndAddFiles(baseDir);

    // Finalize the archive
    archive.finalize();

    // Listen for the archive to be complete
    output.on("close", function () {
      resolve({ vytes: archive.pointer() });
      console.log(
        `Archive .\\${outputZipName} created. Total bytes: ${archive.pointer()}`
      );
    });
  });
}
