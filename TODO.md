# TO-DO (now in github projects)
in no particular order

- [ ] ready things up for linux
    - [ ] make fs directory build into public/system/fs or something like that
    - [ ] make service worker functional by scraping all the `public` files
- [x] finish boot (hooray about time)
- [x] finalize boot add api
- [x] finalize other boot logging API's
- [ ] create better fs api
- [ ] create fs utils
- [x] make boot logs classes - *discarded*
- [x] fix bug with localforage not working (haha this was because I was trying to save a function which isn't supported - I forgot the parentheses)
- [x] research localStorage (done, I think using localforage promises are best for this case)
- [ ] fix pwa not installable for some reason
- [ ] make good enough window system
- [ ] DO THINGS when booting (things that actually take time)
- [ ] Make window flashing feature (like in windows 10 kinda)
- [x] consider renaming project to windows92 - not happening, but this OS needs an identity
- [x] ~~*it is impossible* to cache all of the app files into the fs. consider moving open99-apps/src to system/applications or system/apps and reserve open99-apps for community-made apps. This way, the service worker will cache them.~~ it's possible
- [x] make File class and add utilities to it - this way, sys41.fs api will return a new File instance with the file
- [ ] make my own drag and drop thing for the window
- [x] make a .d.ts file (i really need to do this)
- [x] merge config.js and sys41.js