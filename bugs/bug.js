//COMING SOON

function whereOccurSpecificApp() {
  if (document.getElementById("specificApp").checked) {
    document.getElementById("whichApp").classList.remove("hidden");
  } else {
    document.getElementById("whichApp").classList.add("hidden");
  }
}

//WEB3FORMS INJECTION
(function() {
  var form = document.getElementsByTagName("form")[0];
  var accessKey = document.createElement("input");
  accessKey.setAttribute("type", "hidden");
  accessKey.setAttribute("name", "apikey");
  accessKey.setAttribute("value", "896d2f9a-f729-443b-be74-041986e1e117"); //Change if this is your own fork
  var subject = document.createElement("input");
  subject.setAttribute("type", "hidden");
  subject.setAttribute("name", "subject");
  subject.setAttribute("value", "New bug report - Windows99");
  var version = document.createElement("input");
  subject.setAttribute("type", "hidden");
  subject.setAttribute("name", "version");
  subject.setAttribute(
    "value",
    sys41.system.version +
      " on " +
      sys41.user.navigatorFull +
      " using " +
      sys41.system.channel
  );
  var fromName = document.createElement("input");
  subject.setAttribute("type", "hidden");
  subject.setAttribute("name", "from_name");
  subject.setAttribute("value", "Windows99 Bugs");
  //SUBMISSION SETUP
  form.addEventListener("submit", function (e) {
    const formData = new FormData(form);
    e.preventDefault();
    var object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    var json = JSON.stringify(object);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        let json = await response.json();
        if (!response.status == 200) {
          console.log(response);
        }
      })
      .catch((error) => {
        alert(error);
      })
      .then(function () {
        form.reset();
      });
  });
})();
