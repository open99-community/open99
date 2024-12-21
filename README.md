# 🌌 pluto
a complete web OS
> **Note:** Along with all the source code, this document is closed-source and private. If you find this document floating around the internet or if someone sends it to you, [contact me](https://stretch.wtf/contact).
## About
Pluto is an offline, close-sourced Web OS, similar to Windows93 or Windows96. It intends to be the most sophisticated, complete, and developer-friendly web OS.  
Pluto programs run under the program runtime (codename 41worker), which is comparable to WRT for Windows 96. These applications run in workers to improve speed, security, and convenience. To learn more, visit [the docs page](https://learn.d.pluto.stretch.wtf/api/41worker).
## Installation
> Make sure you have yarn installed. Pluto does not support npm/pnpm.
1. Clone the repository locally.
2. Copy the environment variables by running `cp .env.example .env`.
3. Install the dependencies by running `yarn`.
### Tauri Installation
Pluto uses the Tauri framework to build the desktop application.
This is not required for the web version.  
> Follow the instructions [here](https://tauri.app/v1/guides/getting-started/prerequisites) to install the required tools for building for desktop.
## Usage
You can build pluto by running `yarn build`.
This will build the OS into the `/dist` folder.
Because Pluto is a static application, it does not require any server-side shenanigans.  
Additionally, you may use `yarn start` to build and serve Pluto locally on port 8000.
This enables the watch mode, meaning every time you save a file, the application will rebuild.

To build Pluto on the global network, Cloudflare Pages, you must push to the RELEASE branch.

### Build Mode
Pluto requires for a build mode environment variable to be set. Currently, this can either be in `development` or `production` modes.
This is declared using the NODE_ENV environment variable (yes, capitalized).

Certain parts of the Pluto kernel rely on NODE_ENV (for example, anti-piracy, devtools detector, obfuscation, etc.).
Code that references `process.env.NODE_ENV` is simplified at build, for both development and production modes.

## Structure
### Directories
* `/executables/installer/` gets built into `/dist/assets/installer.zip` as a zip file.
* `/executables/root/` gets built into `/dist/assets/rootfs.zip` as a zip file.
* `/scripts/` is the build scripts.  
* `/public/` is static files. This includes CSS as well as images.  
* `/src/` is the OS kernel and gets built to `/dist/index.js`.  
* `/src-tauri/` is the Tauri application code (contains rust and tauri config, mainly)  
* `/dist/` is your ready-to-run build of Pluto.  

## CLOC
You may accurately count lines of code by running `cloc --exclude-dir="node_modules,src-tauri,dist,package-lock.json" --quiet .` in the root directory.