const ASSETS = [
	"system/README.md",
	"system/styles/bs.css",
	"system/styles/README.md",
	"system/styles/sys41.css",
	"system/styles/themes/7.css",
	"system/styles/themes/98.css",
	"system/styles/themes/README.md",
	"system/styles/themes/xp.css",
	"system/styles/3party/menu98.css",
	"system/styles/3party/README.md",
	"system/scripts/README.md",
	"system/scripts/signin.js",
	"system/scripts/sys41.js",
	"system/scripts/3party/clippy.js",
	"system/scripts/3party/id.js",
	"system/scripts/3party/jszip.js",
	"system/scripts/3party/localforage.js",
	"system/scripts/3party/README.md",
	"system/scripts/3party/screenshot.js",
	"system/fs/rootfs.zip",
	"system/fonts/ms_sans_serif.woff",
	"system/fonts/ms_sans_serif.woff2",
	"system/cursors/default.cur",
	"system/cursors/default.png",
	"system/cursors/pointer.cur",
	"system/cursors/pointer.png",
	"system/cursors/README.md",
	"system/cursors/text.cur",
	"system/cursors/text.png",
	"system/assets/xp/README.md",
	"system/assets/xp/system/README.md",
	"system/assets/xp/system/img/sys41-192.png",
	"system/assets/xp/system/img/sys41-512.png",
	"system/assets/xp/system/img/sys41-800.png",
	"system/assets/xp/system/img/win99-192.png",
	"system/assets/xp/system/img/win99-32.png",
	"system/assets/xp/system/img/win99-512.png",
	"system/assets/xp/system/audio/boot.mp3",
	"system/assets/xp/login/user_login_key.png",
	"system/assets/xp/internet/world.png",
	"system/assets/xp/install/README.md",
	"system/assets/xp/help/hand.png",
	"system/assets/xp/help/tip.png",
	"system/assets/xp/file/pdf.png",
	"system/assets/xp/file/zip.png",
	"system/assets/xp/file/text/html.png",
	"system/assets/xp/file/text/README.md",
	"system/assets/xp/file/audio/mp3.png",
	"system/assets/xp/file/audio/README.md",
	"system/assets/xp/directory/closed.png",
	"system/assets/xp/directory/documents.png",
	"system/assets/xp/directory/downloads.png",
	"system/assets/xp/directory/fonts.png",
	"system/assets/xp/directory/images.png",
	"system/assets/xp/directory/music.png",
	"system/assets/xp/directory/open.png",
	"system/assets/xp/directory/README.md",
	"system/assets/xp/directory/trash_empty.png",
	"system/assets/xp/directory/trash_full.png",
	"system/assets/xp/directory/uploads.png",
	"system/assets/xp/device/computer.png",
	"system/assets/xp/device/idle_off.png",
	"system/assets/xp/device/readonly.png",
	"system/assets/xp/device/sleep.png",
	"system/assets/buttons/blank.gif",
	"system/assets/buttons/google.gif",
	"system/assets/buttons/linux-directory.gif",
	"system/assets/buttons/linuxnow.gif",
	"system/assets/buttons/madewithnotepad.gif",
	"system/assets/buttons/website.gif",
	"system/assets/buttons/wget.gif",
	"system/assets/98/README.md",
	"system/assets/98/system/README.md",
	"system/assets/98/system/img/open99-16.png",
	"system/assets/98/system/img/sys41-192.png",
	"system/assets/98/system/img/sys41-512.png",
	"system/assets/98/system/img/sys41-800.png",
	"system/assets/98/system/img/win99-192.png",
	"system/assets/98/system/img/win99-32.png",
	"system/assets/98/system/img/win99-512.png",
	"system/assets/98/system/audio/boot.mp3",
	"system/assets/98/login/user_login_key.png",
	"system/assets/98/internet/world.png",
	"system/assets/98/install/installer_file_text.png",
	"system/assets/98/help/hand.png",
	"system/assets/98/help/help.png",
	"system/assets/98/help/tip.png",
	"system/assets/98/file/homepage.png",
	"system/assets/98/file/log.png",
	"system/assets/98/file/question.png",
	"system/assets/98/file/sys.png",
	"system/assets/98/file/temp.png",
	"system/assets/98/file/textpad.png",
	"system/assets/98/file/windows.png",
	"system/assets/98/file/zip.png",
	"system/assets/98/file/text/html.png",
	"system/assets/98/file/text/json.png",
	"system/assets/98/file/text/README.md",
	"system/assets/98/file/image/gif.png",
	"system/assets/98/file/image/jpg.png",
	"system/assets/98/file/audio/flac.png",
	"system/assets/98/file/audio/midi.png",
	"system/assets/98/file/audio/mp3.png",
	"system/assets/98/file/audio/ogg.png",
	"system/assets/98/file/audio/README.md",
	"system/assets/98/file/audio/wav.png",
	"system/assets/98/directory/directory_admin_tools.png",
	"system/assets/98/directory/directory_antenna.png",
	"system/assets/98/directory/directory_check.png",
	"system/assets/98/directory/directory_closed.png",
	"system/assets/98/directory/directory_computer.png",
	"system/assets/98/directory/filedelete.png",
	"system/assets/98/directory/find.png",
	"system/assets/98/directory/ie.png",
	"system/assets/98/directory/network_connect.png",
	"system/assets/98/directory/README.md",
	"system/assets/98/directory/trash_empty.png",
	"system/assets/98/directory/trash_full.png",
	"system/assets/98/dialog/check.png",
	"system/assets/98/dialog/error.png",
	"system/assets/98/dialog/info.png",
	"system/assets/98/dialog/question.png",
	"system/assets/98/dialog/sleep.png",
	"system/assets/98/dialog/warning.png",
	"system/assets/98/device/computer.png",
	"system/assets/98/device/floppy_drive.png",
	"system/assets/98/device/hardware.png",
	"system/assets/98/device/idle_off.png",
	"system/assets/98/device/ram.png",
	"system/assets/98/device/readonly.png",
	"system/assets/7/README.md",
	"system/assets/7/system/README.md",
	"system/assets/7/system/img/sys41-192.png",
	"system/assets/7/system/img/sys41-512.png",
	"system/assets/7/system/img/sys41-800.png",
	"system/assets/7/system/img/win99-192.png",
	"system/assets/7/system/img/win99-32.png",
	"system/assets/7/system/img/win99-512.png",
	"system/assets/7/system/audio/boot.mp3",
	"index.html"
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('assets').then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});
