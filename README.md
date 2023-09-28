# 🌌 pluto
a complete web OS
## About
Pluto is a close-sourced Web OS, similar to Windows93 or Windows96. It intends to be the most sophisticated, complete, and developer-friendly web OS.  
Applications in open99 run under the 41worker environment, which is comparable to WRT for Windows 96. 41worker applications run in workers to improve speed, security, and convenience. To learn more, visit [the docs page](https://developers.pluto.stretch.wtf/learn/api/41worker).
## Install
You can install the codebase onto your system by cloning the repo and running `npm i -g serve && npm i -g nodemon && npm i`.  
Note that installing both of those packages globally is required.
## Usage
You can build pluto by running `npm run build`. This will build the OS and copy it into the `/dist` folder.
## Structure
`/installer_fs` gets built into `/dist/assets/installer.zip` as a zip file.  
`/target_fs` gets built into `/dist/assets/rootfs.zip` as a zip file.  
`/build` is the build scripts.  
`/public` is static files. This includes CSS as well as images.  
`/src` is the OS kernel and gets built to `/dist/index.ts`.  
`/src-tauri` is the Tauri application code (contains rust and tauri config, mainly)  
`/dist` is your ready-to-run build of Pluto.  
