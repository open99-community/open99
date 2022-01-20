var sys41 = {
  user: {
    files: null,
    addFile: function(key, value){
      if (sys41.user.files === null){
        sys41.user.files = {}
      };
      sys41.user.files[key] = value
    },
    apps: {
      bsod: {
        short_name: "bsod",
        name: "Blue screen of death",
        action: function (text, title) {
          document.body.innerHTML = `
            <link rel="stylesheet" href="/system/styles/bs.css">
            <script>function gohome() {window.location.href='/';}</script>

            <div onclick = "gohome()" onkeydown="gohome()" class="bsod">
              <span class="title">ERROR ${title}</span>
              <p>${text}</p>
              <p>&bull; Press CTRL+ALT+DEL to reboot your computer - You will<br /> &nbsp; lose any unsaved information in any programs that are running.</p>
              <a href="/">Press any key to reboot <blink>_</blink></a>
            </div>
            `;
        },
        categories: ["Fun"],
        system: true,
        permissions: ["administrateSystem"]
      },
      reboot: {
        short_name: "reboot",
        name: "Reboot system",
        action: function () {
          location.reload();
        },
        categories: ["Utility"],
        system: true,
        removeable: false,
        permissions: ["administrateSystem"]
      },
      shutDown: {
        short_name: "power",
        name: "Shut down",
        action: function () {
          document.body.innerHTML = ``;
          window.close();
          self.close()
        },
        categories: ["Utility"],
        system: true,
        removeable: false,
        permissions: ["administrateSystem"]
      },
      batteryDetector: {
        short_name: "battery",
        name: "Battery Detector",
        action: null,
        background_action: function () {},
        categories: ["Background"],
        system: true,
        permissions: ["widget"]
      },
    },
    profile: {
      "accountType": null,
      "userName": null,
      "icon": null,
      "background": {
        "type": null,
        "url": null,
      },
      "email": null,
    },
  },
  system: {
    boot: {
      stopped: false,
      dom: {
        element: document.getElementsByClassName("boottext")[0],
        mainElement: document.getElementById("bootscreen"),
      },
      add: function (text, error) {
        var el = document.createElement("p");
        el.innerText = text;
        if (error) {
          el.classList.add("boot-error");
        };
        document.getElementsByClassName("boottext")[0].appendChild(el);
        return el;
      },
      finish: function () {
        var bootscreen = document.getElementsByClassName("bootscreen")[0];
        bootscreen.parentNode.removeChild(bootscreen);
        var el = document.createElement("div");
        el.classList.add("postboot");
      },
      stop: function () {
        sys41.system.boot.finish = null;
      },
    },
    themes: {
      change: function (name) {
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
        }
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
        }
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
        }
      }
    },
    createWindow: function (data) {
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
    removeWindow: function () {return},
  },
  ui: {
    createProgBar: function(element, features){
      if (sys41.system.themes.current.supports.progBar) {
        var el = document.createElement("div")
        el.ariaRoleDescription = "progressbar"
        el.ariaValueMin = features.min
        el.ariaValueMax = features.max
        el.ariaValueNow = features.now
        var elIn = document.createElement("div")
        elIn.style.width = features.width
        elIn.append(el)
        el.append(element)
      } else {
        return Error("Theme " + sys41.system.themes.current.name + "does not support progress bar")
      }
    },
    createBalloon: function(element, features){
      if (sys41.system.themes.current.supports.balloon || sys41.system.themes.current.supports.tooltip) {
        var el = document.createElement("div")
        el.ariaRoleDescription = "tooltip"
        el.innerText = features.text
        el.append(element)
      } else {
        return Error("Theme " + sys41.system.themes.current.name + "does not support tooltip/balloon")
      }
    },
  },
};
sys41.system.version = "0.1";
sys41.system.channel =
  location.url == "https://windows99.vercel.app" ? "stable" : location.url == "https://windows99dev.vercel.app" ? "development" : "unknown";

//Browser detector
var nav = navigator.userAgent;
sys41.user.navigatorFull = navigator.userAgent;
if (nav.indexOf("Firefox") > -1) {
  sys41.user.navigator = "Mozilla Firefox";
} else if (nav.indexOf("SamsungBrowser") > -1) {
  sys41.user.navigator = "Samsung Internet";
} else if (nav.indexOf("Opera") > -1 || nav.indexOf("OPR") > -1) {
  sys41.user.navigator = "Opera";
} else if (nav.indexOf("Trident") > -1) {
  sys41.user.navigator = "Microsoft Internet Explorer";
} else if (nav.indexOf("Edge") > -1) {
  sys41.user.navigator = "Microsoft Edge (Legacy)";
} else if (nav.indexOf("Edg") > -1) {
  sys41.user.navigator = "Microsoft Edge";
} else if (nav.indexOf("Chrome") > -1) {
  sys41.user.navigator = "Chrome or Chromium";
} else if (nav.indexOf("Safari") > -1) {
  sys41.user.navigator = "Apple Safari";
} else {
  sys41.user.navigator = "Unknown Navigator";
}

function openNav() {
  document.getElementById("myDebug").style.width = "250px";
}

function closeNav() {
  document.getElementById("myDebug").style.width = "0";
}
