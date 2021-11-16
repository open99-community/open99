//BOOTSCREEN
if ($(".bootscreen")[0]){
    //Variable setup
    var welcome = document.getElementById("welcome");
    var dateUserAgent = document.getElementById("dateUserAgent");
    var devmodeText = document.getElementById("devmode");
    var server = document.getElementById("server");
    var port = document.getElementById("port");
    var plugins = document.getElementById("plugins");
    var protocol = document.getElementById("protocol");
    var hash = document.getElementById("hash");
    //Actual boot
    welcome.innerHTML = `
    system41 presents <a class="rainbow-text">Windows 99</a> version 0.4 (official.dev)<br />
    licensed under the <b>Mozilla Public License</b>` 
    dateUserAgent.innerHTML = `booting on ` + Date() + `<br />in ` + sys41.user.navigator + `<br />`
    if (!location.port || !location.href === 'https://windows99.vercel.app') {
        devmodeText.classList.add("hidden")
    } else {
        devmodeText.innerHTML = `<span class="warning-boot">WARNING: you are running this on a custom or non-production server.<br />
        please be aware this is not an official release of windows99. <a href="https://itspablo.gitbook.io/windows99/forking/faq#unverified_boot_error">learn how to remove this</a></span>`
    };
    server.innerText = 'Server: ' + location.hostname;
    if (location.port === undefined || location.port === null) {
      port.classList.add("hidden");
    } else {
      port.innerHTML = 'Port number: ' + location.port
    };
    
    for(var i = 0; i < navigator.plugins.length; i++) {
        plugins.innerHTML = `<p>` + navigator.plugins.name[i] + `</p>`
    }
    
    if (protocol === "https:") {
      protocol.innerHTML = 'Protocol: secure'
    } else {
      protocol.innerHTML = 'Protocol: ' + location.protocol
    };
};

//SET THEME
document.head.getElementById("stylelink").setAttribute("href", "system/styles/themes/98.css")

//Remove right-click functionality
document.addEventListener("contextmenu", function(evt) {
  evt.preventDefault();
});

//DEBUG
$('#draggable').draggable();
$('#draggable').click(function() {
        $('#bigger').toggleClass('hidden');
    });
