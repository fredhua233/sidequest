// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDoc} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaL53kiJfrdlH5jNaoBBnCcDv10FZ82z0",
  authDomain: "centifygames-f547e.firebaseapp.com",
  projectId: "centifygames-f547e",
  storageBucket: "centifygames-f547e.appspot.com",
  messagingSenderId: "270397286111",
  appId: "1:270397286111:web:ce2ed98b5a57b589dbeb6a",
  measurementId: "G-DSSL2BS1M5"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

export async function addUser(name, platform, game) {
  await setDoc(doc(db, "users", name), {
    name: name,
    platform: platform,
    game: game,
    balance: 1000,
  })
  .then(() => {
      console.log("Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
}

export async function getUser(name) {
  const docSnap = await getDoc(doc(db, "users", name))
  .then((doc) => {
    if (doc.exists()) {
      console.log("Document data:", doc.data());
      return doc.data();
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });
}
