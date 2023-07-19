# open99
a complete web OS
## About
open99 is a close-sourced Web OS, similar to Windows93 or Windows96. It intends to be the most sophisticated, complete, and developer-friendly web OS.  
Applications in open99 run under the 41worker environment, which is comparable to WRT for Windows 96. 41worker applications run in workers to improve speed, security, and convenience. To learn more, visit [the docs page](https://docs.open99.ga/api/41worker).
## Usage
You can build open99 by running `npm run build`. This will build the OS and put it in the `/dist` folder.
## Structure
`/sys` gets built into `/fs`.
`/fs` gets built into `/public/assets/rootfs.zip` as a zip file.  
`/public` is static files. This currently includes CSS.  
`/src` is the OS kernel and gets built to `/public/index.js`. The source map is also available there.  
`/dist` is your ready-to-run build of open99.  
