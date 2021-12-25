var head = document.getElementsByTagName("head")[0];

//Setup
document.onclick = function (e) {
  e.preventDefault;
};

//Actual boot
if ($(".bootscreen")[0]) {
  //Welcome
  sys41.system.boot.html.welcome.innerHTML = `
    system41 presents <a class="rainbow-text">Windows 99</a> version 0.4 (official.dev)<br />
    licensed under the <b>Mozilla Public License</b>`;
  //date and useragent
  sys41.system.boot.html.dateUserAgent.innerHTML =
    `booting on ` + Date() + `<br />in ` + sys41.user.navigator + `<br />`;
  if (location.href === "https://windows99.vercel.app") {
    sys41.system.boot.html.devmodeText.classList.add("hidden");
  } else {
    sys41.system.boot.html.devmodeText.innerHTML = `<span class="warning-boot">WARNING: you are running this on a custom or non-production server.<br />
        please be aware this is not an official release of windows99. <a onclick='open("https://itspablo.gitbook.io/windows99/forking/faq#unverified_boot_error", "_blank")'><b>learn how to remove this</b></a></span>`;
  }
  //server
  sys41.system.boot.html.server.innerText = "Server: " + location.href;
  //port
  if (!location.port) {
    sys41.system.boot.html.port.innerHTML = "Port number: none";
  } else {
    sys41.system.boot.html.port.innerHTML = "Port number: " + location.port;
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

//Finish boot!
setTimeout(function () {
  sys41.system.boot.finish();
}, 3000);
