sys41 = {
  "user": {
    "files": {}
  },
  "system": {
    "boot": {
      "stopped": false,
      "update": false,
      "html": {
        "welcome": document.getElementById("welcome"),
        "dateUserAgent": document.getElementById("dateUserAgent"),
        "devmodeText": document.getElementById("devmode"),
        "server": document.getElementById("server"),
        "port": document.getElementById("port"),
        "plugins": document.getElementById("plugins"),
        "protocol": document.getElementById("protocol"),
        "hash": document.getElementById("hash")
      },
      "finish": function(){
        var bootscreen = document.getElementsByClassName("bootscreen")[0];
        bootscreen.parentNode.removeChild(bootscreen);
        var el = document.createElement("div");
        el.classList.add("postboot");
        
      },
      "stop": function(){
        //I need to add a way to bypass this. This is too boring!
        sys41.system.boot.finish = null
      }
    },
    "themes": {
      "change": function(name){sys41.themes[name].current = true} //COMING SOON
    }
  }
}
sys41.system.version = '0.1'

sys41.system.themes.win7 = {
    "url": "system/styles/themes/7.css",
    "abt": "Standard Windows 7 theme. Comes with windows99",
    "current": false,
    "name": "Windows 7"
}
sys41.system.themes.win98 = {
    "url": "system/styles/themes/98.css",
    "abt": "Standard Windows 98 theme. Comes with windows99 and is the default theme on first boot",
    "current": true,
    "name": "Windows 98"
}
sys41.system.themes.winxp = {
    "url":"system/styles/themes/xp.css",
    "abt": "Standard Windows XP theme. Comes with windows99",
    "current": false,
    "name": "Windows XP"
}

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
  sys41.user.navigator = "Chrome or Chromium";
} else if (nav.indexOf("Safari") > -1) {
  sys41.user.navigator = "Apple Safari";
} else {
  sys41.user.navigator = "Unknown Navigator";
};

//COMING SOON: LOCALFORAGE FILE SAVING - FILES GO TO sys41.files
for(var i = 0; i < localforage.length(); i++) {
  //COMING SOON
}

function openNav() {
  document.getElementById("myDebug").style.width = "250px";
}

function closeNav() {
  document.getElementById("myDebug").style.width = "0";
}