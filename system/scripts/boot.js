//Setup
document.onclick = function(e) {e.preventDefault}

//Actual boot
if ($(".bootscreen")[0]){
    sys41.boot.html.welcome.innerHTML = `
    system41 presents <a class="rainbow-text">Windows 99</a> version 0.4 (official.dev)<br />
    licensed under the <b>Mozilla Public License</b>` 
    sys41.boot.html.dateUserAgent.innerHTML = `booting on ` + Date() + `<br />in ` + sys41.user.navigator + `<br />`
    if ((!location.port) || (!location.href === 'https://windows99.vercel.app')) {
        sys41.boot.html.devmodeText.classList.add("hidden")
    } else {
        sys41.boot.html.devmodeText.innerHTML = `<span class="warning-boot">WARNING: you are running this on a custom or non-production server.<br />
        please be aware this is not an official release of windows99. <a href="https://itspablo.gitbook.io/windows99/forking/faq#unverified_boot_error"><b>learn how to remove this</b></a></span>`
    };
    sys41.boot.href.server.innerText = 'Server: ' + location.href;
    if ((location.port === undefined) || (location.port === null)) {
      sys41.boot.html.port.classList.add("hidden");
    } else {
      sys41.boot.html.port.innerHTML = 'Port number: ' + location.port
    };
    
    for(var i = 0; i < navigator.plugins.length; i++) {
        sys41.boot.html.plugins.innerHTML = `<p>` + navigator.plugins.name[i] + `</p>`
    }
    
    if (location.protocol === "https:") {
      sys41.boot.html.protocol.innerHTML = 'Protocol: secure'
    } else {
      sys41.boot.html.protocol.innerHTML = 'Protocol: ' + location.protocol
    };
};

alert("debug")
//SET THEME
document.head.getElementById("stylelink").setAttribute("href", "system/styles/themes/98.css")

//Remove right-click functionality
document.addEventListener("contextmenu", function(evt) {
  evt.preventDefault();
});

function openNav() {
  document.getElementById("myDebug").style.width = "250px";
}

function closeNav() {
  document.getElementById("myDebug").style.width = "0";
}
