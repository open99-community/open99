//windows99 uses firebase for 'local' authentication.
//when the user is offline, they can choose to sign in anonymously

import { getAuth, signInAnonymously } from "firebase/auth";

const auth = getAuth();
signInAnonymously(auth)
  .then(() => {
    alert(auth);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });
