import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDataToFirebase } from "./api";

const auth = getAuth();

export function signUp(userData) {
  console.log("Auth running");
  createUserWithEmailAndPassword(auth, userData.email, userData.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
      addDataToFirebase("users", userData.email, userData);
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
    })
    .catch((error) => {
      // An error happened.
    });
}
