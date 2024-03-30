# 🌌 pluto
a complete web OS
> **Note:** Along with all the source code, this document is confidential.
## About
Pluto is a close-sourced Web OS, similar to Windows93 or Windows96. It intends to be the most sophisticated, complete, and developer-friendly web OS.  
Pluto programs run under the program runtime (codename 41worker), which is comparable to WRT for Windows 96. These applications run in workers to improve speed, security, and convenience. To learn more, visit [the docs page](https://learn.d.pluto.stretch.wtf/api/41worker).
## Installation
1. Clone the repository locally by running `git clone https://github.com/use-pluto/pluto.git`.
2. Install the dependencies by running `npm i`.
3. Copy the environment variables by running `cp .env.example .env`.
## Usage
You can build pluto by running `npm run build`.
This will build the OS into the `/dist` folder.
Additionally, you may use `npm start` to build and serve Pluto locally on port 8000.  

To build Pluto on the global network, you must push to the RELEASE branch.
## Structure
### Directories
* `/installer_fs/` gets built into `/dist/installer-{random sequence}.zip` as a zip file. It is temporarily located in `/installer_fs_BUILD/` during the build process. If the build fails, this directory will not be deleted.
* `/target_fs/` gets built into `/dist/assets/rootfs-{random sequence}.zip` as a zip file. It is temporarily located in `/target_fs_BUILD/` during the build process. If the build fails, this directory will not be deleted.
* `/build/` is the build scripts.  
* `/public/` is static files. This includes CSS as well as images.  
* `/src/` is the OS kernel and gets built to `/dist/index.js`.  
* `/src-tauri/` is the Tauri application code (contains rust and tauri config, mainly)  
* `/dist/` is your ready-to-run build of Pluto.  

You may accurately count lines of code by running `cloc --exclude-dir="node_modules,src-tauri,dist,package-lock.json" --quiet .` in the root directory.