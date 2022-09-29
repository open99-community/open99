const uid = new ShortUniqueId({ length: 10 });
(function () {
  localforage.config({
    driver: localforage.INDEXEDDB,
    description: "Main offline storage backend for open99. Uses IndexedDB.",
  });
})();
const sys41 = {
  user: {
    apps: {},
    profile: {
      accountType: null,
      userName: null,
      icon: null,
      background: null,
      email: null,
      firstTime: null,
    },
  },
  fs: {
    get: async function (key) {
      if (/^[a-zA-Z]:\/[a-zA-Z]/.test(key)) { //regex for seeing if entire query includes drive
        return localforage.getItem(key)
      } else if (/^\/[a-zA-Z]/.test(key)) { //regex for seeing if query does not include drive & starts with a slash
        return localforage.getItem(sys41.fs.utils.defaultDrive + key)
      } else {
        return new Error("Not valid format, check docs")
      }
    },
    set: async function (key, value) {
      if (/^[a-zA-Z]:\/[a-zA-Z]/.test(key)) {
        localforage.setItem(key, value)
      } else if (/^\/[a-zA-Z]/.test(key)) {
        localforage.setItem(sys41.fs.utils.defaultDrive + key, value)
      } else {
        return new Error("Not valid format, check docs")
      }
      return new sys41.fs._File(key, value)
    },
    delete: async function (key) {
      if (!sys41.fs.getItem[key]) {
        return Error("File doesn't exist")
      } else if (/^[a-zA-Z]:\/[a-zA-Z]/.test(key)) {
        localforage.removeItem(key, value)
      } else if (/^\/[a-zA-Z]/.test(key)) {
        localforage.removeItem(sys41.fs.utils.defaultDrive + key, value)
      } else {
        return new Error("Not valid format, check docs")
      }
      return true;
    },
    utils: {
      "config": async function () { await localforage.getItem("_profile") },
      "defaultDrive": "C:",
    },
    _File: class {
      constructor(path, content = localforage.getItem(path)){ /* I don't want developers handling this class, EVER. this should only be an internal
      thing used by sys41.fs.* apis. In fact, the entire reason this isn't in the sys41.fs.set and sys41.fs.get functions is because of the DRY principle*/
        this.path = path
        this.content = content
        this.hasContent = !!content
        this.drive = path.slice(0,3)
        this.ext = null
        this.mime = null
        this.icon = null
      }
    }
  },
  dom: {
    boot: document.getElementsByClassName("boot")[0],
    desktop: null,
    taskbar: null,
    strtmnu: null,
  },
  system: {
    getVersion() {
      fetch("/version.txt").then(function (ver) { ver.text() }).then(data => {return data})
    },
    getChannel() {
      let chan;
      if (location.href === "https://open99.ga") {
        chan = "main"
      } else if (location.href === "https://dev.open99.ga") {
        chan = "devel"
      } else {
        chan = "illegal"
      }
      return chan
    },
    boot: {
      stopped: false,
      set: function (text = "", features = {}, id) {
        let el = id || document.createElement("p");
        el.innerHTML = text || el.innerHTML;
        if (features.icon) {
          if (features.icon === "error") {
            el.innerHTML =
              `<p class="error"><span><img class="boot-image" alt="error icon" src="system/assets/98/dialog/error.png"></span>` + text + `</p>`;
            el.classList.add("error");
          }
          if (features.icon === "success") {
            el.innerHTML =
              `<p class="success"><span><img class="boot-image" alt="success check" src="system/assets/98/dialog/check.png"></span>` + text + `</p>`;
            el.classList.add("success");
          }
          if (features.icon === "warning") {
            el.innerHTML =
              `<p class="warning"><span><img class="boot-image" alt="warning icon" src="system/assets/98/dialog/warning.png"></span>` + text + `</p>`;
            el.classList.add("success");
          }
        }
        if (features.blink) {
          el.innerHTML = "<blink>" + el.innerHTML + "</blink>"
        }
        if (features.color) {
          el.style.color = features.color
        }
        if (!id) {
          document.getElementsByClassName("boot")[0].appendChild(el);
          el.scrollIntoView()
          return el
        } else {
          return el
        }
      },
      finish: function () {
          let boot = document.getElementsByClassName("boot")[0];
          boot.parentNode.removeChild(boot);
          let el = document.createElement("div");
          el.classList.add("postboot");
      },
    },
    themes: {
      change: function (name = sys41.system.themes.current) {
        sys41.system.themes[name].current = true;
      },
      current: null,
      win7: {
        url: "system/styles/themes/7.css",
        abt: "Standard Windows 7 theme. Comes with open99",
        current: false,
        name: "Windows 7",
        img: null,
        supports: {
          ballon: true,
          progBar: true,
          tabs: true,
        },
      },
      win98: {
        url: "system/styles/themes/98.css",
        abt: "Standard Windows 98 theme. Comes with open99 and is the default theme on first boot",
        current: true,
        name: "Windows 98",
        img: null,
        supports: {
          ballon: false,
          progBar: false,
          tabs: true,
        },
      },
      winxp: {
        url: "system/styles/themes/xp.css",
        abt: "Standard Windows XP theme. Comes with open99",
        current: false,
        name: "Windows XP",
        img: null,
        supports: {
          balloon: false,
          progBar: false,
          tabs: false,
        },
      },
    },
  },
  settings: {},
  ui: {
    createProgBar: function (element, features) {
      if (sys41.system.themes.current.supports.progBar) {
        let el = document.createElement("div");
        el.ariaRoleDescription = "progressbar";
        el.ariaValueMin = features.min;
        el.ariaValueMax = features.max;
        el.ariaValueNow = features.now;
        let elIn = document.createElement("div");
        elIn.style.width = features.width;
        elIn.append(el);
        el.append(element);
      } else {
        throw Error(
          "Theme " +
          sys41.system.themes.current.name +
          " does not support progress bar"
        );
      }
    },
    createBalloon: function (element, features) {
      if (
        sys41.system.themes.current.supports.balloon ||
        sys41.system.themes.current.supports.tooltip
      ) {
        let el = document.createElement("div");
        el.ariaRoleDescription = "tooltip";
        el.innerText = features.text;
        el.append(element);
      } else {
        throw Error(
          "Theme " +
          sys41.system.themes.current.name +
          " does not support tooltip/balloon"
        );
      }
    },
    cursors: {
      "default": "/system/cursors/default.cur",
      "pointer": "/system/cursors/pointer.cur",
      "text": "/system/cursors/text.cur",

    },
  },
  Window: class {
    constructor({ title: winTitle = "", body: winBody = "", draggable: isDraggable = true, dockable: isDockable = true, icon: icon,} = {}) {
      this.title = winTitle;
      this.body = winBody;
      this.draggable = isDraggable;
      if (isDockable) {
        let dckthing = document.createElement("button")
        dckthing.innerHTML = 
        `
        <img src="${icon}"><p>${title}</p>
        `
        sys41.dom.tskbar.appendChild(dckthing)
        this.dockitem = dckthing
      } else {
        this.dockable = false
      }
      sys41.dom.dsktop.style.cursor = "wait"
      sys41.dom.tskbar.style.cursor = "wait"
      /* ---- */
      let winInner = `
            <div class="title-bar">
                <div class="title-bar-text">${winTitle}</div>
                <div class="title-bar-controls">
                    <button aria-label="Minimize">
                    <button aria-label="Maximize">
                    <button aria-label="Close">
                </div>
            </div>
            <div class="window-body">${winBody}</div>
        `
      let thing = document.createElement('div')
      thing.className = "window"
      thing.innerHTML = winInner
      let newWin = document.body.appendChild(thing)
      if (isDraggable) {
        let x, y, target = null;
        newWin.addEventListener('mousedown', function (e) {
          let clickedDragger = false;
          for (var i = 0; e.path[i] !== document.body; i++) {
            if (e.path[i].classList.contains('title-bar')) {
              clickedDragger = true;
            }
            else if (clickedDragger) {
              target = e.path[i];
              target.classList.add('dragging');
              x = e.clientX - target.style.left.slice(0, -2);
              y = e.clientY - target.style.top.slice(0, -2);
              return;
            }
          }
        });

        newWin.addEventListener('mouseup', function () {
          if (target !== null) target.classList.remove('dragging');
          target = null;
        });

        newWin.addEventListener('mousemove', function (e) {
          if (target === null) return;
          target.style.left = e.clientX - x + 'px';
          target.style.top = e.clientY - y + 'px';
          let pRect = target.parentElement.getBoundingClientRect();
          let tgtRect = target.getBoundingClientRect();

          if (tgtRect.left < pRect.left) target.style.left = 0;
          if (tgtRect.top < pRect.top) target.style.top = 0;
          if (tgtRect.right > pRect.right) target.style.left = pRect.width - tgtRect.width + 'px';
          if (tgtRect.bottom > pRect.bottom) target.style.top = pRect.height - tgtRect.height + 'px';
        });
      } else {
        this.draggable = false;
      }
      this.el = newWin;
      return this;
    }
    get footer() {
      return null;
    }
    set footer(value) {
      return this;
    }
    get title() {
      return this.el.firstChild.firstChild.innerText
    }
    set title(value) {
      this.el.firstChild.firstChild.innerText = value
      return this;
    }
    close() {
      this.el.remove()
      this.dockitem.remove()
    }
  }
};

const $fs = sys41.fs;
const $window = sys41.system.createWindow;
const $prompt = null;
const $alert = null;
const $io = null;
const $url = null;
const $form = null;
const $confirm = null;
const $log = null;
const win93apis = [$fs, $window, $prompt, $alert, $io, $url, $form, $confirm, $log]
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

window.onbeforeunload = () => { return "Are you sure?" }

//fun stuff, no more config

(() => {
  sys41.system.boot.set(`
    system41 presents <a class="rainbow-text">open99</a> version 0.4 (official.dev)`)
  let dateNav = sys41.system.boot.set(
    `booting on ` + Date() + `<br />in ` + window.navigator.userAgent + `<br />`)
  if (location.href === "https://open99.ga") {
    dateNav.classList.add("hidden");
  } else {
    sys41.system.boot.set(`WARNING: you are running this on a custom, development, or staging server.<br />
        please be aware this is not an official release of open99. <a href="//docs.open99.ga/hosting/server" target="_blank"><b>learn more</b></a>`, { icon: "warning" })
  }
  //server
  let servURL
  if (location.href.includes("#")) {
    let position = location.href.indexOf('#')
    servURL = location.href.slice(0, position)
    sys41.system.boot.set("Server: " + servURL)
  } else if (location.href.includes("?")) {
    let position = location.href.indexOf('?')
    servURL = location.href.slice(0, position)
    sys41.system.boot.set("Server: " + servURL)
  }
  //port
  if (!location.port) {
    sys41.system.boot.set("Port: none")
  } else {
    sys41.system.boot.set("Port number: " + location.port)
  }
  //protocol
  if (location.protocol === "https:") {
    sys41.system.boot.set("Protocol: secure (HTTPS)", { icon: "success" });
  } else {
    sys41.system.boot.set(
      "Protocol: " +
      location.protocol +
      '<br / >Watch out! The protocol you are using is insecure and therefore many open99 features will fail to work. <a href="//docs.open99.ga/hosting/insecure-protocol">learn more</a>',
      { icon: "warning" }
    );
  }
  //hash
  if (location.hash) {
    if (location.hash.indexOf("access_token=") > -1 && location.hash.indexOf("refresh_token=") > -1 && location.hash.indexOf("token_type") > -1 && location.hash.indexOf("expires_in") > -1) {
      sys41.system.boot.set("Hash: none (signin)")
    } else {
      sys41.system.boot.set("Hash: " + decodeURI(location.hash));
    }
  } else {
    sys41.system.boot.set("Hash: none")
  }
  //plugins
  let plugins = []
  for (let i = 0; i < navigator.plugins.length; i++) {
    plugins.push(navigator.plugins[i].name)
  }
  sys41.system.boot.set("System plugins: " + plugins.join(", "), { "color": "lime" })
  //account control
  /*if (location.href.indexOf("?error") === servURL.length + 1) {
    sys41.system.boot.set("Error: " + location.href.slice(location.href.indexOf("?error="), location.href.indexOf("&")) + location.href.slice(location.href.indexOf("?error_description="), location.href.length));
  }*/

  //SET THEME
  document.getElementById("stylelink").setAttribute("href", "system/styles/themes/98.css");

  //Remove right-click functionality
  document.body.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

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
      sys41.fs.set(key, value)
      sys41.system.boot.set("Extracted " + key, { "color": "yellow" })
    }).then(function () {
      sys41.system.boot.set('File iteration has completed. localforage files are now on sys41.fs');
    }).catch(function (err) {
      sys41.system.boot.set(err, { "icon": "error", "blink": true });
      console.error(err)
    });
  } else {
    let promise = new JSZip.external.Promise(function (resolve, reject) {
      JSZipUtils.getBinaryContent('./system/fs/rootfs.zip', function (err, data) {
        if (err) {
          reject(err);
          sys41.system.boot.set(err, { 'error': true })
        } else {
          resolve(data);
        }
      });
    });
    promise.then(JSZip.loadAsync)
      .then(function (zip) {
        zip.forEach(function (path, file) {
          //sys41.system.boot.set("Extracting " + path)
        })
      })
  }

  html2canvas(document.body).then(image => {
    sys41.fs.set("/b:/script.png", image.toDataURL())
  })
  sys41.fs.set("/b:/script.html", sys41.dom.boot.innerHTML) //for debug, like win96
  if (accountExist) {
    sys41.system.boot.finish();
  } else {
    sys41.fs.set("_profile", { accountType: "local", firstTime: true })
  }

  if (!sys41.settings.strtmnu) {
    sys41.settings.strtmnu = [
      {
        "name": "Documents",
        "id": "documents",
        "icon": "./system/assets/98/directory/directory_closed.png",
        "exec": "alert('not ready yet! :P well at least this worked')"
      },
      {
        "name": "Programs",
        "id": "programs",
        "icon": "",
        "items": [
          {
            "name": "Test",
            "icon": "./system/assets/98/directory/directory_computer.png",
            "exec": `alert('hey, this worked! hooray')`
          }
        ],
        "itemsSmall": true,
      }
    ]
  }

  //sleep(3000)

  /* ------------------ Post boot - */
  let dsktop = document.createElement("div")
  sys41.dom.desktop = dsktop
  dsktop.id = "dsktop"
  dsktop.style.display = "none"
  document.body.appendChild(dsktop)

  let tskbar = document.createElement("div")
  sys41.dom.taskbar = tskbar
  tskbar.id = "tskbar"
  dsktop.appendChild(tskbar)
  let startbtn = document.createElement("button")
  startbtn.innerHTML =
    `
  <img src="/system/assets/98/system/img/open99-16.png" /><b>Start</b>
  `
  tskbar.appendChild(startbtn)
  //start menu
  let strtmnu = document.createElement("div")
  strtmnu.classList.add('startmenu')
  let sidebar = document.createElement('div')
  sidebar.classList.add('startmenu-sidebar')
  let headline = document.createElement('div')
  headline.classList.add('headline')
  headline.innerHTML = `<strong>Open</strong> 99`
  sys41.dom.strtmnu = strtmnu
  sys41.settings.strtmnu.forEach(item => {
    strtmnu.innerHTML += `
    <div class="item" data-item-id="${item.id}" onclick="${item.exec}">
      <img src="${item.icon}" />
      <p>${item.name}</p>
      <div class="hidden itemsSmall">
        <img src>
      </div>
    </div>
    `
  })

  dsktop.appendChild(strtmnu)
  strtmnu.appendChild(sidebar)
  sidebar.appendChild(headline)


  /* Now that we've finished adding the elements, let's remove the boot screen and make the dsktop visible */
  sys41.dom.boot.remove()
  dsktop.style.display = "block"

})()

export default sys41