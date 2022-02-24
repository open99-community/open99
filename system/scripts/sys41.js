(function () {
  sys41.system.boot.add(`
    system41 presents <a class="rainbow-text">Windows 99</a> version 0.4 (official.dev)`)
  let dateNav = sys41.system.boot.add(
    `booting on ` + Date() + `<br />in ` + sys41.user.profile.data.navigator + `<br />`)
  if (location.href === "https://windows99.vercel.app") {
    dateNav.classList.add("hidden");
  } else {
    sys41.system.boot.add(`WARNING: you are running this on a custom, development, or staging server.<br />
        please be aware this is not an official release of windows99. <a href='https://itspablo.gitbook.io/windows99/forking/faq#unverified_boot_error' target="_blank"><b>learn more</b></a>`, { icon: "warning" })
  }
  //server
  let servURL
  if (location.href.includes("#")) {
    let position = location.href.indexOf('#')
    servURL = location.href.slice(0, position)
    sys41.system.boot.add("Server: " + servURL)
  } else if (location.href.includes("?")) {
    let position = location.href.indexOf('?')
    servURL = location.href.slice(0, position)
    sys41.system.boot.add("Server: " + servURL)
  }
  //port
  if (!location.port) {
    sys41.system.boot.add("Port: none")
  } else {
    sys41.system.boot.add("Port number: " + location.port)
  }
  //protocol
  if (location.protocol === "https:") {
    sys41.system.boot.add("Protocol: secure (HTTPS)", { icon: "success" });
  } else {
    sys41.system.boot.add(
      "Protocol: " +
      location.protocol +
      '<br / >Watch out! The protocol you are using is insecure and therefore many windows99 features will fail to work. <a href="">learn more</a>',
      { icon: "warning" }
    );
  }
  //hash
  if (location.hash) {
    if (location.hash.indexOf("access_token=") > -1 && location.hash.indexOf("refresh_token=") > -1 && location.hash.indexOf("token_type") > -1 && location.hash.indexOf("expires_in") > -1) {
      sys41.system.boot.add("Hash: none (signin)")
    } else {
      sys41.system.boot.add("Hash: " + decodeURI(location.hash));
    }
  } else {
    sys41.system.boot.add("Hash: none")
  }
  //plugins
  let plugins = []
  for (let i = 0; i < navigator.plugins.length; i++) {
    plugins.push(navigator.plugins[i].name)
  }
  sys41.system.boot.add("System plugins: " + plugins.join(", "), { "color": "lime" })
  //account control
  if (location.href.indexOf("?error") === servURL.length + 1){
    sys41.system.boot.add("Error: " + location.href.slice(location.href.indexOf("?error="), location.href.indexOf("&")) + location.href.slice(location.href.indexOf("?error_description="), location.href.length));
  }
})()

//SET THEME
document.getElementById("stylelink").setAttribute("href", "system/styles/themes/98.css");

//Remove right-click functionality
document.body.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

(function () {
  let accountExist;
  localforage.getItem("_profile").then(function (value) {
    if (value) {
      accountExist = true
    } else {
      accountExist = false
    }
  })
  if (accountExist) {
    localforage.iterate(function (value, key, iterationNumber) {
      sys41.user.fs.set(key, value)
      sys41.system.boot.add("Extracted " + key, { "color": "yellow" })
    }).then(function () {
      sys41.system.boot.add('File iteration has completed. localforage files are now on sys41.user.fs.files');
    }).catch(function (err) {
      sys41.system.boot.add(err, { "icon": "error", "blink": true });
      console.error(err)
    });
  } else {
    //fetch(location.href + "/system/fs.zip").then(content => content.text).then(filesystem => {let fsZIP = filesystem})
    let promise = new JSZip.external.Promise(function (resolve, reject) {
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
        zip.forEach(function (path, file) {
          sys41.system.boot.add("Extracting " + path)
        })
      })
  }

  //Finish boot!
  setTimeout(function () {
    html2canvas(document.body).then(function (image) {
      sys41.user.fs.set("/b:/script.png", image)
    })
    sys41.user.fs.set("/b:/script.html", sys41.system.boot.dom.element.innerHTML)
    //finish boot
    if (accountExist) {
      sys41.system.boot.finish();
    } else {
      sys41.user.fs.set("_profile", { accountType: "local", firstTime: true })
    }
  }, 3000);
})()