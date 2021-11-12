var sys41 = {
  'user': {},
  'system': {}
}
sys41.system.version = '0.1'

//Remove right-click functionality
document.addEventListener("contextmenu", function(evt) {
  evt.preventDefault();
});

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

if ($(".bootscreen")[0]){
    var welcome = document.getElementsByTagName("p")[0];
    var agent = document.getElementsByTagName("p")[1];
    var date = document.getElementsByTagName("p")[2];
    var server = document.getElementsByTagName("p")[3];
    var port = document.getElementsByTagName("p")[4];
    var protocol = document.getElementsByTagName("p")[5];
    agent.innerText = sys41.user.navigatorFull;
    date.innerText = 'Booting system on ' + Date();
    server.innerText = location.hostname;
    if (location.port === undefined || location.port === null) {
      port.classList.add("hidden");
    } else {
      port.innerText = location.port
    };
    if (protocol === 'https:') {
      protocol.innerText = 'secure'
    } else {
      protocol.innerText = location.protocol
    };
};
for(var i = 0; i < navigator.plugins.length; i++) {
  getElementsByTagName('p')[i].innerHTML = navigator.plugins.name[i];
};
