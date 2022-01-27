(function () {
  sys41.system.boot.add(`
    system41 presents <a class="rainbow-text">Windows 99</a> version 0.4 (official.dev)<br />
    licensed under the <b>Mozilla Public License</b>`)
  var dateNav = sys41.system.boot.add(
    `booting on ` + Date() + `<br />in ` + sys41.user.profile.data.navigator + `<br />`)
  if (location.href === "https://windows99.vercel.app") {
    dateNav.classList.add("hidden");
  } else {
    sys41.system.boot.add(`WARNING: you are running this on a custom or non-production server.<br />
        please be aware this is not an official release of windows99. <a href='https://itspablo.gitbook.io/windows99/forking/faq#unverified_boot_error' target="_blank"><b>learn how to remove this</b></a>`, { warning: true })
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
    sys41.system.boot.add("Protocol: secure (HTTPS)", { success: true });
  } else {
    sys41.system.boot.add(
      "Protocol: " +
      location.protocol +
      '<br / >Watch out! The protocol you are using is insecure and therefore many windows99 features will fail to work. <a href="">learn more</a>',
      { error: true }
    );
  }
  //hash
  if (location.hash) {
    sys41.system.boot.add("Hash: " + location.hash);
  } else {
    sys41.system.boot.add("Hash: none")
  }
  //plugins
  for (var i = 0; i < navigator.plugins.length; i++) {
    sys41.system.boot.add(navigator.plugins[i].name)
  }
})()

//SET THEME
document.getElementById("stylelink").setAttribute("href", "system/styles/themes/98.css");

//Remove right-click functionality
document.body.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

(function () {
  var accountExist
  localforage.getItem("_profile").then(function (value) {
    if (value) {
      accountExist = true
    } else {
      accountExist = false
    }
  })
  if (accountExist) {
    localforage.iterate(function (value, key, iterationNumber) {
      sys41.user.fs.add(key, value)
      sys41.system.boot.add("Extracted " + key, { "color": "yellow" })
    }).then(function () {
      sys41.system.boot.add('File iteration has completed. localforage files are now on sys41.user.fs.files');
    }).catch(function (err) {
      sys41.system.boot.add(err, { "error": true, "blink": true });
      console.error(err)
    });
  } else {
    //fetch(location.href + "/system/fs.zip").then(content => content.text).then(filesystem => {var fsZIP = filesystem})
    var promise = new JSZip.external.Promise(function (resolve, reject) {
      JSZipUtils.getBinaryContent('./system/fs.zip', function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    promise.then(JSZip.loadAsync)
      .then(function (zip) {
        zip.forEach(function(path, file){
          sys41.system.boot.add("Extracting " + file)
        })
      })
  }

  //Finish boot!
  setTimeout(function () {
    html2canvas(document.body).then(function (image) {
      sys41.user.fs.add("/b:/script.png")
    })
    sys41.user.fs.add("/b:/script.html", sys41.system.boot.element.innerHTML)
    //finish boot
    if (accountExist) {
      sys41.system.boot.finish();
    } else {
      sys41.user.fs.add("_profile", { accountType: "local", firstTime: true })
    }
  }, 3000);
})()