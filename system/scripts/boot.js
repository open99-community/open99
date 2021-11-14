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
