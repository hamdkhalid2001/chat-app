import { firebaseApp } from "./firebase";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export async function addDataToFirebase(collection, document, data) {
  console.log("Sending data", data);
  try {
    await setDoc(doc(db, collection, document), data);
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
