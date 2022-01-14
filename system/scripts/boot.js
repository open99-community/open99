const localforage = require("./3party/localforage");

var head = document.getElementsByTagName("head")[0];

//Setup
document.onclick = function (e) {
  e.preventDefault;
};

//Actual boot
if ($(".bootscreen")[0]) {
  //Welcome
  alert()
  sys41.system.boot.add(`
    system41 presents <a class="rainbow-text">Windows 99</a> version 0.4 (official.dev)<br />
    licensed under the <b>Mozilla Public License</b>`)
  //date and useragent
  var dateNav = sys41.system.boot.add(
    `booting on ` + Date() + `<br />in ` + sys41.user.navigator + `<br />`)
  if (location.href === "https://windows99.vercel.app") {
    dateNav.classList.add("hidden");
  } else {
    sys41.system.boot.add(`<span class="warning-boot">WARNING: you are running this on a custom or non-production server.<br />
        please be aware this is not an official release of windows99. <a onclick='open("https://itspablo.gitbook.io/windows99/forking/faq#unverified_boot_error", "_blank")'><b>learn how to remove this</b></a></span>`)
  }
  //server
  sys41.system.boot.add("Server: " + location.href)
  //port
  if (!location.port) {
    sys41.system.boot.add("Port number: none")
  } else {
    sys41.system.boot.add("Port number: " + location.port)
  }
  //protocol
  if (location.protocol === "https:") {
    sys41.system.boot.add("Protocol: ✔️ secure");
  } else {
    sys41.system.boot.add(
      "Protocol: " +
        location.protocol +
        '<p href="" class="boot-error"> Watch out! The protocol you are using is insecure and therefore many windows99 features will fail to work. <a href="">learn how to remove this.</a></p>',
      true
    );
  }
  //hash
  if (location.hash) {
    sys41.system.boot.add("Hash: " + location.hash);
  }
  //plugins
  /*for (var i = 0; i < navigator.plugins.length; i++) {
    sys41.system.boot.html.plugins.innerHTML +=
      `<p>` + navigator.plugins.name[i] + `</p>`;
  }*/
}

//SET THEME
head
  .getElementById("stylelink")
  .setAttribute("href", "system/styles/themes/98.css");

//Remove right-click functionality
document.oncontextmenu(function (e) {
  e.preventDefault();
});

localforage.iterate(function(value, key, iterationNumber) {
  sys41.user.addFile(key, value)
}).then(function() {
  console.log('File iteration has completed!');
}).catch(function(err) {
  console.error(err);
});

//Finish boot!
setTimeout(function () {
  sys41.system.boot.finish();
}, 3000);
