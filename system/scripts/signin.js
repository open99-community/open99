//windows99 uses firebase for 'local' authentication.
//when the user is offline, they can choose to sign in anonymously
//temporarily, anonymous signin is required
firebase.auth().signInAnonymously()
  .then(() => {
    // Signed in
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(error.code + " " + error.message)
  });
