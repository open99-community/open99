# 🌌 pluto
a complete web OS
> **Note:** Along with all the source code, this document is closed-source and private. If you find this document floating around the internet or if someone sends it to you, [contact me](https://stretch.wtf/contact).
## About
Pluto is an offline, close-sourced Web OS, similar to Windows93 or Windows96. It intends to be the most sophisticated, complete, and developer-friendly web OS.  
Pluto programs run under the program runtime (codename 41worker), which is comparable to WRT for Windows 96. These applications run in workers to improve speed, security, and convenience. To learn more, visit [the docs page](https://learn.d.pluto.stretch.wtf/api/41worker).
## Installation
1. Clone the repository locally by running `git clone https://github.com/use-pluto/pluto.git`.
2. Copy the environment variables by running `cp .env.example .env`.
3. Install the dependencies by running `npm i`.
### Tauri Installation
Pluto uses the Tauri framework to build the desktop application.
This is not required for the web version.
1. Follow the instructions [here](https://tauri.app/v1/guides/getting-started/prerequisites)
2. Run `npm install --save-dev @tauri-apps/cli` to install Tauri.
## Usage
You can build pluto by running `npm run build`.
This will build the OS into the `/dist` folder.
Because Pluto is a static application, it does not require any server-side shenanigans.  
Additionally, you may use `npm start` to build and serve Pluto locally on port 8000.
This enables the watch mode, meaning every time you save a file, the application will rebuild.

To build Pluto on the global network, Cloudflare Pages, you must push to the RELEASE branch.

### Build Mode
Pluto requires for a build mode environment variable to be set. Currently, this can either be in `development` or `production` modes.
This is declared using the NODE_ENV environment variable (yes, capitalized).
Alternatively, you may also use the `.env` file to declare this value. You may also set the `-- --env=buildmode` flag, where 'buildmode' is one of the accepted build modes, to either value when running `npm start` or `npm run build`. Note that the two extra dashes are required.
Setting this value using the command-line flag overrides process.env.NODE_ENV and .env.

Certain parts of the Pluto Kernel rely on NODE_ENV (for example, anti-piracy, devtools detector, obfuscation, etc.).
Code that references `process.env.NODE_ENV` is simplified at build, for both development and production modes.

## Structure
### Directories
* `/installer_fs/` gets built into `/dist/installer-{random sequence}.zip` as a zip file. It is temporarily located in `/installer_fs_BUILD/` during the build process. If the build fails, this directory will not be deleted.
* `/target_fs/` gets built into `/dist/assets/rootfs-{random sequence}.zip` as a zip file. It is temporarily located in `/target_fs_BUILD/` during the build process. If the build fails, this directory will not be deleted.
* `/build/` is the build scripts.  
* `/public/` is static files. This includes CSS as well as images.  
* `/src/` is the OS kernel and gets built to `/dist/index.js`.  
* `/src-tauri/` is the Tauri application code (contains rust and tauri config, mainly)  
* `/dist/` is your ready-to-run build of Pluto.  

## CLOC
You may accurately count lines of code by running `cloc --exclude-dir="node_modules,src-tauri,dist,package-lock.json" --quiet .` in the root directory.