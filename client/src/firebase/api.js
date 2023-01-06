import { firebaseApp } from "./firebase";
import {
  doc,
  addDoc,
  getFirestore,
  getDoc,
  collection,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export async function addDataToFirebase(document, data) {
  console.log("Sending data", data);
  try {
    // await addDoc(doc(db, collection, document), data);
    const docRef = await addDoc(collection(db, "users"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.log(error);
  }
}

export async function readSingleDataFromFirebase(collection, document) {
  const docRef = doc(db, collection, document);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}
