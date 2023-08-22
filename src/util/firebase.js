// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, updateDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes} from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
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

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export async function addUser(name, platform, game, balance) {
  await setDoc(doc(db, "users", name), {
    name: name,
    platform: platform,
    game: game,
    balance: balance,
    // ingame: false,
  })
  .then(() => {
      console.log("Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
}

export async function getUser(name) {
  await getDoc(doc(db, "users", name))
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

export async function uploadImage(username, file){
  const storageRef = ref(storage, '/' + username + '/' + file.name);
  await uploadBytes(storageRef, file)
  .then((snapshot) => {
    console.log('Uploaded a blob or file!')
  })
  .catch((error) => {
      console.log("Error getting document:", error);
    });
}

export async function currentBalance(username){ // subtracts amt from user's balance
  const docRef = doc(db, "users", username); 
  var balance;
  //DO NOT USE TWO FIREBASE CALLS IN A SINGLE FUNCTION
  await getDoc(docRef)
  .then((doc) => {
    if (doc.exists()) {
      balance = doc.data().balance;
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  }); 
  return balance;
}

// export async function getInGame(username){
//   const docRef = doc(db, "users", username);
//   var ingame;
//   await getDoc(docRef)
//   .then((doc) => {
//     if (doc.exists()) {
//       ingame = doc.data().ingame;
//     } else {
//       console.log("No such document!");
//     }
//   })
//   .catch((error) => {
//     console.log("Error getting document:", error);
//   }); 
//   return ingame;
// }

// export async function updateOutOfGame(username){
//   const docRef = doc(db, "users", username);
//   await updateDoc(docRef, {
//     ingame: false,
//   })
//   .then(() => {
//   })
//   .catch((error) => {
//       console.error("Error writing document: ", error);
//   });
// }

export async function updateBalance(username, amt){
  const docRef = doc(db, "users", username);

  await updateDoc(docRef, {
    balance: amt,
    // ingame: true,
  })
  .then(() => {
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
}
 
