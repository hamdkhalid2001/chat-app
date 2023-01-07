import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

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
