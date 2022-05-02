const uid = new ShortUniqueId({ length: 10 });
(function () {
  localforage.config({
    driver: localforage.INDEXEDDB,
    description: "Main offline storage backend for open99. Uses IndexedDB.",
  });
})();
let sys41 = {
  user: {
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
    },
  },
  fs: {
    get: async function (key) {
      if (key[1] !== ":" && key[0] === "/") {
        
      return new sys41.fs._File(sys41.fs.utils.defaultDrive + "/" + key)
      } else if (key[1 || 2] === ":") {
        return localforage.getItem(key)
      } else {
        return new Error("Not valid format, check docs")
      }
    },
    set: async function (key, value) {
      if (key[1] !== ":" && key[0] === "/") {
        localforage.setItem(sys41.fs.utils.defaultDrive + "/" + key, value)
      } else if (key[1] === ":" && key[0] !== "/") {
        localforage.setItem(key, value)
        continue;
      } else {
        return new Error("Not valid format, check docs")
      }
      return new sys41.fs._File(key, value)
    },
    delete: async function (key) {
      if (!sys41.fs.getItem[key]) {
        return Error("File doesn't exist")
      } else if (key[1] !== ":" && key[0] === "/") {
        localforage.removeItem(sys41.fs.utils.defaultDrive + "/" + key, value)
      } else if (key[1] === ":" && key[0] !== "/") {
        localforage.removeItem(key, value)
      } else {
        return new Error("Not valid format, check docs")
      }
      return true;
    },
    utils: {
      "config": async function () { await localforage.getItem("_profile") },
      "defaultDrive": "C:/",
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
    desktop: document.getElementById("dsktop"),
    taskbar: document.getElementById("tskbar"),
  },
  system: {
    get version() {
      let gg;
      fetch("version.txt").then(function (ver) { ver.text() }).then(data => {data = gg})
      return gg;
    },
    get channel() {
      let chan;
      if (location.href === "https://open99.ga") {
        chan = "main"
      } else if (location.href === "https://dev.open99.ga") {
        chan = "devel"
      } else {
        chan = "custom"
      }
    },
    set channel(value) { return new Error("modify api file to change channel name.") },
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
      get bootable() {
        if (sys41.user.files) {
          return true;
        } else {
          return false;
        }
      },
      finish: function () {
        if (sys41.system.boot.bootable) {
          let boot = document.getElementsByClassName("boot")[0];
          boot.parentNode.removeChild(boot);
          let el = document.createElement("div");
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
    iframeUrls: [],
    createWindow: function (
      data = { draggable: true, resizable: true, html: `<p>No data</p>` }
    ) {
      if (!typeof data === "object") {
        return TypeError("Must be a valid WinObject object");
      }
      let winMain = document.createElement("div");
      let titleBar = document.createElement("div");
      let titleBarText = document.createElement("div");
      let titleBarIcon = null; //for now
      let titleBarControls = document.createElement("div");
      let titleBarControlsMinimize = document.createElement("button");
      let titleBarControlsMaximize = document.createElement("button");
      let titleBarControlsClose = document.createElement("button");
      let winContent = document.createElement("div");

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
        let el = document.createElement("div");
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