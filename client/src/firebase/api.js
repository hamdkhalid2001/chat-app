import { firebaseApp } from "./firebase";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export async function addDataToFirebase(docId, data, merge) {
  console.log("Sending data", docId);
  try {
    await setDoc(doc(db, "users", docId), data, {
      merge: merge,
    });
    // console.log("Document written with ID: ", docRef.id);
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
