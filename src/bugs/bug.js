(function () {
  document.forms[0].addEventListener("submit", handleSubmit);

  const handleSubmit = (e) => {
    e.preventDefault();
    let myForm = document.forms[0]
    let formData = new FormData(myForm);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => location.assign('/'))
      .catch((error) => alert(error));
  };
})()