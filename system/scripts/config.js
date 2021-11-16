//SYS41 SETUP
var sys41 = {
  "user": {
    "files": {}
  },
  "system": {
    "boot": {
      "stopped": false,
      "update": false
    }
  },
  "apps": "coming soon!"/*{}*/
}
sys41.system.version = '0.1'

sys41.system.themes = {
  "Windows 7": {
    "url": "system/styles/themes/7.css",
    "abt": "Standard Windows 7 theme. Comes with windows99",
    "current": false
  },
  "Windows 98": {
    "url": "system/styles/themes/98.css",
    "abt": "Standard Windows 98 theme. Comes with windows99 and is the default theme on first boot",
    "current": true
  },
  "Windows XP": {
    "url":"system/styles/themes/xp.css"
    "abt": "Standard Windows XP theme. Comes with windows99",
    "current": false
  }
};

localforage.setItem("sys41", sys41)

  //Browser detector
var nav = navigator.userAgent;
sys41.user.navigatorFull = navigator.userAgent;
if (nav.indexOf("Firefox") > -1) {
  sys41.user.navigator = "Mozilla Firefox";
} else if (nav.indexOf("SamsungBrowser") > -1) {
  sys41.user.navigator = "Samsung Internet";
} else if (nav.indexOf("Opera") > -1 || nav.indexOf("OPR") > -1) {
  sys41.user.navigator = "Opera";
} else if (nav.indexOf("Trident") > -1) {
  sys41.user.navigator = "Microsoft Internet Explorer";
} else if (nav.indexOf("Edge") > -1) {
  sys41.user.navigator = "Microsoft Edge (Legacy)";
} else if (nav.indexOf("Edg") > -1) {
  sys41.user.navigator = "Microsoft Edge";
} else if (nav.indexOf("Chrome") > -1) {
  sys41.user.navigator = "Chrome/Chromium";
} else if (nav.indexOf("Safari") > -1) {
  sys41.user.navigator = "Apple Safari";
} else {
  sys41.user.navigator = "unknown";
};

alert(localforage.getItem("sys41"))
