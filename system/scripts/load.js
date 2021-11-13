//SYS41 SETUP
var sys41 = {
  'user': {},
  'system': {}
}
sys41.system.version = '0.1'

sys41.system.themes = {
  "Windows 7": {
    "url": "system/styles/themes/7.css",
    "abt": "Standard Windows 7 theme. Comes with windows99",
    "default": false,
  },
  "Windows 98": {
    "url": "system/styles/themes/98.css",
    "abt": "Standard Windows 98 theme. Comes with windows99 and is the default theme on first boot",
    "default": true
  },
  "Windows XP": {
    "url":"system/styles/themes/xp.css"
    "abt": "Standard Windows XP theme. Comes with windows99",
    "default": false
  }
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
  sys41.user.navigator = "Chrome/Chromium";
} else if (nav.indexOf("Safari") > -1) {
  sys41.user.navigator = "Apple Safari";
} else {
  sys41.user.navigator = "unknown";
}

//BOOTSCREEN
if ($(".bootscreen")[0]){
    var welcomeAgentDate = document.getElementsByTagName("p")[0];
    var server = document.getElementsByTagName("p")[3];
    var plugins = document.getElementsByTagName("p")[4];
    var port = document.getElementsByTagName("p")[5];
    var protocol = document.getElementsByTagName("p")[6];
    var hash = document.getElementsByTagName("p")[7];
    welcomeAgentDate.innerHTML = `system41 presents <a class="rainbow-text">Windows 99</a> version 0.4 (official.dev)<br />licensed under the <b>Mozilla Public License</b><br /><br />booting ` + date() + `<br />on ` + sys41.user.navigator + `<br />`
    server.innerText = 'Server: ' + location.hostname;
    if (location.port === undefined || location.port === null) {
      port.classList.add("hidden");
    } else {
      port.innerText = 'Port number: ' + location.port
    };
    if (protocol === 'https:') {
      protocol.innerText = 'Protocol: secure'
    } else {
      protocol.innerText = 'Protocol: ' + location.protocol
    };
};

//Remove right-click functionality
document.addEventListener("contextmenu", function(evt) {
  evt.preventDefault();
});
