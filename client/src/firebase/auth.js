import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth();

export function signIn(loginData) {
  console.log("login");
  signInWithEmailAndPassword(auth, loginData.email, loginData.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export function logOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Signed Out");
    })
    .catch((error) => {
      console.log(error);
      // An error happened.
    });
}
