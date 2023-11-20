# 🌌 pluto
a complete web OS
> **Note:** Along with all the source code, this document is confidential.
## About
Pluto is a close-sourced Web OS, similar to Windows93 or Windows96. It intends to be the most sophisticated, complete, and developer-friendly web OS.  
Pluto programs run under the program runtime (codename 41worker), which is comparable to WRT for Windows 96. These applications run in workers to improve speed, security, and convenience. To learn more, visit [the docs page](https://developer.pluto.stretch.wtf/learn/api/41worker).
## Install
You can install the codebase onto your system by cloning the repo and running `npm i -g serve && npm i -g nodemon && npm i`.  
Note that installing both of those packages globally is required.
## Usage
You can build pluto by running `npm run build`. This will build the OS and copy it into the `/dist` folder.
## Structure
### Directories
* `/installer_fs/` gets built into `/dist/installer-{random sequence}.zip` as a zip file. It is temporarily located in `/installer_fs_BUILD/` during the build process.
* `/target_fs/` gets built into `/dist/assets/rootfs-{random sequence}.zip` as a zip file. It is temporarily located in `/target_fs_BUILD/` during the build process.  
* `/build/` is the build scripts.  
* `/public/` is static files. This includes CSS as well as images.  
* `/src/` is the OS kernel and gets built to `/dist/index.ts`.  
* `/src-tauri/` is the Tauri application code (contains rust and tauri config, mainly)  
* `/dist/` is your ready-to-run build of Pluto.  
### Versioning
- ***Kernel***: Similarly to Windows, it is versioned using a build string. 
    - The scheme looks like this: `major.minor.build.branch-commit.timestamp`
    - Major and minor are self-explanatory - they are retrieved from package.json
    - The build number of the build string increments by 1 every time it is *pushed* on git (built on the global network), **not** whenever it is built locally.
    - Branch, commit and timestamp are applied automatically at global network build—timestamp should be a Unix timestamp.
    - The build string is accessible in the kernel via the `$SYSVER` global.
    - When pluto is built on the local network, the build string is `major.minor.00000.LOCAL-00000.timestamp`
- ***Specific applications***: Usually semver, but sometimes a build string.