const ASSETS = [
	"src/404.html",
	"src/contribute.html",
	"src/favicon.ico",
	"src/index.html",
	"src/manifest.json",
	"src/sw.js",
	"src/version.txt",
	"src/system/README.md",
	"src/system/styles/bs.css",
	"src/system/styles/README.md",
	"src/system/styles/sys41.css",
	"src/system/styles/themes/7.css",
	"src/system/styles/themes/98.css",
	"src/system/styles/themes/README.md",
	"src/system/styles/themes/xp.css",
	"src/system/styles/3party/menu98.css",
	"src/system/styles/3party/README.md",
	"src/system/scripts/README.md",
	"src/system/scripts/signin.js",
	"src/system/scripts/sys41.js",
	"src/system/scripts/3party/clippy.js",
	"src/system/scripts/3party/id.js",
	"src/system/scripts/3party/jszip.js",
	"src/system/scripts/3party/localforage.js",
	"src/system/scripts/3party/README.md",
	"src/system/scripts/3party/screenshot.js",
	"src/system/fs/rootfs.zip",
	"src/system/fonts/ms_sans_serif.woff",
	"src/system/fonts/ms_sans_serif.woff2",
	"src/system/cursors/default.cur",
	"src/system/cursors/default.png",
	"src/system/cursors/pointer.cur",
	"src/system/cursors/pointer.png",
	"src/system/cursors/README.md",
	"src/system/cursors/text.cur",
	"src/system/cursors/text.png",
	"src/system/assets/xp/README.md",
	"src/system/assets/xp/system/README.md",
	"src/system/assets/xp/system/img/sys41-192.png",
	"src/system/assets/xp/system/img/sys41-512.png",
	"src/system/assets/xp/system/img/sys41-800.png",
	"src/system/assets/xp/system/img/win99-192.png",
	"src/system/assets/xp/system/img/win99-32.png",
	"src/system/assets/xp/system/img/win99-512.png",
	"src/system/assets/xp/system/audio/boot.mp3",
	"src/system/assets/xp/login/user_login_key.png",
	"src/system/assets/xp/internet/world.png",
	"src/system/assets/xp/install/README.md",
	"src/system/assets/xp/help/hand.png",
	"src/system/assets/xp/help/tip.png",
	"src/system/assets/xp/file/pdf.png",
	"src/system/assets/xp/file/zip.png",
	"src/system/assets/xp/file/text/html.png",
	"src/system/assets/xp/file/text/README.md",
	"src/system/assets/xp/file/audio/mp3.png",
	"src/system/assets/xp/file/audio/README.md",
	"src/system/assets/xp/directory/closed.png",
	"src/system/assets/xp/directory/documents.png",
	"src/system/assets/xp/directory/downloads.png",
	"src/system/assets/xp/directory/fonts.png",
	"src/system/assets/xp/directory/images.png",
	"src/system/assets/xp/directory/music.png",
	"src/system/assets/xp/directory/open.png",
	"src/system/assets/xp/directory/README.md",
	"src/system/assets/xp/directory/trash_empty.png",
	"src/system/assets/xp/directory/trash_full.png",
	"src/system/assets/xp/directory/uploads.png",
	"src/system/assets/xp/device/computer.png",
	"src/system/assets/xp/device/idle_off.png",
	"src/system/assets/xp/device/readonly.png",
	"src/system/assets/xp/device/sleep.png",
	"src/system/assets/buttons/blank.gif",
	"src/system/assets/buttons/google.gif",
	"src/system/assets/buttons/linux-directory.gif",
	"src/system/assets/buttons/linuxnow.gif",
	"src/system/assets/buttons/madewithnotepad.gif",
	"src/system/assets/buttons/website.gif",
	"src/system/assets/buttons/wget.gif",
	"src/system/assets/98/README.md",
	"src/system/assets/98/system/README.md",
	"src/system/assets/98/system/img/open99-16.png",
	"src/system/assets/98/system/img/sys41-192.png",
	"src/system/assets/98/system/img/sys41-512.png",
	"src/system/assets/98/system/img/sys41-800.png",
	"src/system/assets/98/system/img/win99-192.png",
	"src/system/assets/98/system/img/win99-32.png",
	"src/system/assets/98/system/img/win99-512.png",
	"src/system/assets/98/system/audio/boot.mp3",
	"src/system/assets/98/login/user_login_key.png",
	"src/system/assets/98/internet/world.png",
	"src/system/assets/98/install/installer_file_text.png",
	"src/system/assets/98/help/hand.png",
	"src/system/assets/98/help/help.png",
	"src/system/assets/98/help/tip.png",
	"src/system/assets/98/file/homepage.png",
	"src/system/assets/98/file/log.png",
	"src/system/assets/98/file/question.png",
	"src/system/assets/98/file/sys.png",
	"src/system/assets/98/file/temp.png",
	"src/system/assets/98/file/textpad.png",
	"src/system/assets/98/file/windows.png",
	"src/system/assets/98/file/zip.png",
	"src/system/assets/98/file/text/html.png",
	"src/system/assets/98/file/text/json.png",
	"src/system/assets/98/file/text/README.md",
	"src/system/assets/98/file/image/gif.png",
	"src/system/assets/98/file/image/jpg.png",
	"src/system/assets/98/file/audio/flac.png",
	"src/system/assets/98/file/audio/midi.png",
	"src/system/assets/98/file/audio/mp3.png",
	"src/system/assets/98/file/audio/ogg.png",
	"src/system/assets/98/file/audio/README.md",
	"src/system/assets/98/file/audio/wav.png",
	"src/system/assets/98/directory/directory_admin_tools.png",
	"src/system/assets/98/directory/directory_antenna.png",
	"src/system/assets/98/directory/directory_check.png",
	"src/system/assets/98/directory/directory_closed.png",
	"src/system/assets/98/directory/directory_computer.png",
	"src/system/assets/98/directory/filedelete.png",
	"src/system/assets/98/directory/find.png",
	"src/system/assets/98/directory/ie.png",
	"src/system/assets/98/directory/network_connect.png",
	"src/system/assets/98/directory/README.md",
	"src/system/assets/98/directory/trash_empty.png",
	"src/system/assets/98/directory/trash_full.png",
	"src/system/assets/98/dialog/check.png",
	"src/system/assets/98/dialog/error.png",
	"src/system/assets/98/dialog/info.png",
	"src/system/assets/98/dialog/question.png",
	"src/system/assets/98/dialog/sleep.png",
	"src/system/assets/98/dialog/warning.png",
	"src/system/assets/98/device/computer.png",
	"src/system/assets/98/device/floppy_drive.png",
	"src/system/assets/98/device/hardware.png",
	"src/system/assets/98/device/idle_off.png",
	"src/system/assets/98/device/ram.png",
	"src/system/assets/98/device/readonly.png",
	"src/system/assets/7/README.md",
	"src/system/assets/7/system/README.md",
	"src/system/assets/7/system/img/sys41-192.png",
	"src/system/assets/7/system/img/sys41-512.png",
	"src/system/assets/7/system/img/sys41-800.png",
	"src/system/assets/7/system/img/win99-192.png",
	"src/system/assets/7/system/img/win99-32.png",
	"src/system/assets/7/system/img/win99-512.png",
	"src/system/assets/7/system/audio/boot.mp3",
	"src/legal/terms.html",
	"src/experiments/desktop.html",
	"src/experiments/login.html",
	"src/experiments/windows.html"
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('assets').then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});
