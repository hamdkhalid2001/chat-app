import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDataToFirebase } from "./api";
import { redirect } from "react-router-dom";

const auth = getAuth();

export function signUp(userData) {
  createUserWithEmailAndPassword(auth, userData.email, userData.password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      addDataToFirebase("users", userData);
      return redirect("/chat-page");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, " ", errorMessage);
    });
}

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
