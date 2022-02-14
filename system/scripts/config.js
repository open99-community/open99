const uid = new ShortUniqueId({ length: 10 });
(function () {
  localforage.config({
    driver: localforage.INDEXEDDB,
    description: "Main offline storage backend for open99. Uses IndexedDB.",
  });
})();
var sys41 = {
  user: {
    fs: {
      get: function(key){
        localforage.getItem(key).then(function(value){
          return value
        })
      },
      add: function (key, value) {
        if (sys41.user.fs.files[key]) {
          return Error("File already exists, use sys41.user.fs.edit API instead.")
        } else {
          if (!key.indexOf("/") && !key.indexOf("_")) {
            sys41.user.fs.files[key] = "/" + value
          } else {
            sys41.user.fs.files[key] = value;
          }
          return sys41.user.fs.files[key]
        }
      },
      edit: function (key, value) {
        if (!sys41.user.fs.files[key]) {
          return Error("File doesn't exist, use sys41.user.fs.add API instead.")
        } else {
          if (!key.indexOf("/") == 0 && !key.indexOf("_") == 0) {
            sys41.user.fs.files[key] = "/" + value
          } else {
            sys41.user.fs.files[key] = value;
          }
          return sys41.user.fs.files[key]
        }
      },
      delete: function (key) {
        if (!sys41.user.fs.files[key]) {
          return Error("File doesn't exist, use sys41.user.fs.add API instead.")
        } else {
          delete sys41.user.fs.files[key];
          return true;
        }
      }
    },
    appAddress: "",
    apps: [
      {
        short_name: "bsod",
        name: "Blue screen of death",
        action: function (text = "Your system encountered an error and needs to reboot", title = "Fatal error") {
          document.body.innerHTML = `
            <link rel="stylesheet" href="/system/styles/bs.css">
            <script>function gohome() {window.location.href='/';}</script>

            <div onclick="gohome()" onkeydown="gohome()" class="bsod">
              <span class="title">${title}</span>
              <p>${text}</p>
              <p>&bull; Press CTRL+ALT+DEL to reboot your computer - You will<br /> &nbsp; lose any unsaved information in any programs that are running.</p>
              <a href="/">Press any key to reboot <blink>_</blink></a>
            </div>
            `;
        },
        categories: ["Fun"],
        system: true,
        permissions: ["administrateSystem"],
      },
      {
        short_name: "reboot",
        name: "Reboot system",
        action: function () {
          location.reload();
        },
        categories: ["Utility"],
        system: true,
        removeable: false,
        permissions: ["administrateSystem"],
      },
      {
        short_name: "power",
        name: "Shut down",
        action: function () {
          document.body.innerHTML = ``;
          window.close();
          self.close();
        },
        categories: ["Utility"],
        system: true,
        removeable: false,
        permissions: ["administrateSystem"],
      },
      {
        short_name: "battery",
        name: "Battery Detector",
        action: function () { },
        categories: ["System"],
        system: true,
        removeable: false,
        permissions: ["widget", "background"],
      },
      {
        short_name: "antivirus",
        name: "Antivirus",
        action: function () {
          if (!sys41 || !sys41.system || !sys41.user || !sys41.user.apps || !sys41.user.profile || !sys41.user.profile.data || !sys41.system.boot) {
            (function () {
              document.body.innerHTML = `
                <link rel="stylesheet" href="/system/styles/bs.css">
                <script>function gohome() {window.location.href='/';}</script>
    
                <div onclick="gohome()" onkeydown="gohome()" class="bsod">
                  <span class="title">Fatal error</span>
                  <p>Your computer suffered a fatal error that ocurrs when malicious code runs and removes important parts of the system41 API. You can clear your cache if rebooting doesn't work</p>
                  <p>&bull; Press CTRL+ALT+DEL to reboot your computer - You will<br /> &nbsp; lose any unsaved information in any programs that are running.</p>
                  <p>&bull; &bull; After this, try rebooting in Safe Mode and clearing all boot scripts. You should also rid your PC of suspicious apps.</p>
                  <a href="/">Press any key to reboot <blink>_</blink></a>
                </div>
                `;
            })()
          }
        },
        categories: ["System"],
        system: true,
        removeable: true,
        permissions: ["administrateSystem", "antivirusBypass"],
      },
    ],
    profile: {
      accountType: null,
      userName: null,
      icon: null,
      background: {
        type: null,
        url: null,
      },
      email: null,
      firstTime: null,
      data: {
        webAPI: {/*
          indexeddb: webfs.INDEXEDDB,
          webSQL: webfs.WEBSQL,
          localStorage: webfs.LOCALSTORAGE,*/ //webfs is undefined
        },
        platform: {
          name: platform.name,
          version: platform.version,
          os: platform.os,
          description: platform.description,
          userAgent: platform.ua
        }
      }
    },
  },
  system: {
    get version(){
      fetch("version.txt").then(function(ver){return ver})
    },
    set version(value){return new Error("version " + ver + " cannot be set via api. use version.txt file instead.")},
    get channel(){
      let chan;
      if (location.href === "windows99.vercel.app"){
        chan = "main"
      } else if (location.href === "windows99dev.vercel.app"){
        chan = "devel"
      } else {
        chan = "custom"
      }
    }, 
    set channel(value){return new Error("please modify api file to change channel name.")},
    boot: {
      stopped: false,
      dom: {
        element: document.getElementsByClassName("boottext")[0],
        mainElement: document.getElementById("bootscreen"),
      },
      elements: {},
      add: function (text = "message not specified", features = {}, id) {
        var el = document.createElement("p");
        el.innerHTML = text;
        if (features.icon) {
          if (features.icon === "error") {
            el.innerHTML =
            `<p class="boot-error"><span><img class="boot-image" src="system/assets/98/dialog/error.png"></span>` + text + `</p>`;
            el.classList.add("boot-error");
          }
          if (features.icon === "success") {
            el.innerHTML =
              `<p class="boot-success"><span><img class="boot-image" src="system/assets/98/dialog/check.png"></span>` + text + `</p>`;
            el.classList.add("boot-success");
          }
          if (features.icon ==="warning") {
            el.innerHTML =
              `<p class="boot-warning"><span><img class="boot-image" src="system/assets/98/dialog/warning.png"></span>` + text + `</p>`;
            el.classList.add("boot-success");
          }
        }
        if (features.blink) {
          el.innerHTML = "<blink>" + el.innerHTML + "</blink>"
        }
        if (features.color) {
          el.style.color = features.color
        }
        if (!id) {
          document.getElementsByClassName("boottext")[0].appendChild(el);
          let newid = new uid()
          sys41.system.boot.elements[id] = el;
          el.scrollIntoView()
          return { "element": el, "id": newid }
        } else {
          sys41.system.boot.elements[id] = el
          el.scrollIntoView()
          return { "element": el, "id": id }
        }
      },
      remove: function (id) {
        var el = sys41.system.boot.elements[id]
        el.parentNode.removeChild(el)
        delete sys41.system.boot.elements[id]
      },
      get bootable() {
        if (sys41.user.files) {
          return true;
        } else {
          return false;
        }
      },/*
      set bootable(value) {
        throw new Error("property cannot be set")
      },*/
      finish: function () {
        if (sys41.system.boot.bootable) {
          var bootscreen = document.getElementsByClassName("bootscreen")[0];
          bootscreen.parentNode.removeChild(bootscreen);
          var el = document.createElement("div");
          el.classList.add("postboot");
        }
      },
      stop: function () {
        sys41.system.boot.finish = null;
      },
    },
    themes: {
      change: function (name = sys41.system.themes.current) {
        sys41.system.themes[name].current = true;
      },
      current: null,
      win7: {
        url: "system/styles/themes/7.css",
        abt: "Standard Windows 7 theme. Comes with windows99",
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
        abt: "Standard Windows 98 theme. Comes with windows99 and is the default theme on first boot",
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
        abt: "Standard Windows XP theme. Comes with windows99",
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
    createWindow: function (
      data = { draggable: true, resizable: true, html: `<p>No data</p>` }
    ) {
      if (!typeof data === "object") {
        return TypeError("Must be a valid WinObject object");
      }
      var winMain = document.createElement("div");
      var titleBar = document.createElement("div");
      var titleBarText = document.createElement("div");
      var titleBarIcon = null; //for now
      var titleBarControls = document.createElement("div");
      var titleBarControlsMinimize = document.createElement("button");
      var titleBarControlsMaximize = document.createElement("button");
      var titleBarControlsClose = document.createElement("button");
      var winContent = document.createElement("div");

      titleBar.append(winMain);
      winContent.append(winMain);
      titleBarText.append(titleBar);
      titleBarControls.append(titleBar);
      titleBarControlsMaximize.append(titleBarControls);
      titleBarControlsMinimize.append(titleBarControls);
      titleBarControlsClose.append(titleBarControls);

      titleBar.classList.add("title-bar");
      titleBarText.classList.add("title-bar-text");
      titleBarText.innerText = data.title;
      titleBarControls.classList.add("title-bar-controls");
      titleBarControlsClose.setAttribute("aria-label", "Close");
      titleBarControlsMaximize.setAttribute("aria-label", "Maximize");
      titleBarControlsMinimize.setAttribute("aria-label", "Minimize");
      winContent = data.html;
      winContent.classList.add("window-body");

      winMain.appendChild(document.body);
      if (data.draggable) {
        winMain.draggable();
      }
      if (data.resizable) {
        winMain.resizable();
      }
    },
    removeWindow: function () {
      return;
    },
  },
  ui: {
    createProgBar: function (element, features) {
      if (sys41.system.themes.current.supports.progBar) {
        var el = document.createElement("div");
        el.ariaRoleDescription = "progressbar";
        el.ariaValueMin = features.min;
        el.ariaValueMax = features.max;
        el.ariaValueNow = features.now;
        var elIn = document.createElement("div");
        elIn.style.width = features.width;
        elIn.append(el);
        el.append(element);
      } else {
        return Error(
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
        var el = document.createElement("div");
        el.ariaRoleDescription = "tooltip";
        el.innerText = features.text;
        el.append(element);
      } else {
        return Error(
          "Theme " +
          sys41.system.themes.current.name +
          " does not support tooltip/balloon"
        );
      }
    },
    cursors: {
      "default": "",
      "pointer": "",
      
    },
  },
};

const $fs = sys41.user.fs;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}