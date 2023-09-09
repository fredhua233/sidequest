// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, collection, query, where, increment} from "firebase/firestore";
import { getStorage, ref, uploadBytes} from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
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

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);



export async function addHost(roomName, username, host, venmo) {
  const docRef = doc(db, "rooms", roomName);
  const colRef = collection(docRef, "users");

  await setDoc(doc(colRef, username), {
    name: username,
    host: host,
    paid: true,
    // skill: skill,
    venmo: venmo,
    wins: 0,
  })
  .then(() => {
      console.log("Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
}

export async function addUser(roomName, username, venmo) {
  const docRef = doc(db, "rooms", roomName);
  const colRef = collection(docRef, "users");

  await setDoc(doc(colRef, username), {
    name: username,
    host: false,
    paid: true,
    // skill: skill,
    venmo: venmo,
    wins: 0,
  })
  .then(() => {
      console.log("Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
}

export async function makeRoom(roomName, username, venmo, buyin, game) {
  await setDoc(doc(db, "rooms", roomName), {
    roomName: roomName,
    buyin: buyin,
    venmo: venmo,
    game: game,
    open: true,
  })
  .then(() => {
      console.log("Document successfully written!" + roomName + username + buyin);
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
}

export async function userAddWin(roomName, username){
  const colRef = collection(doc(db, "rooms", roomName), "users");
  const docRef = doc(colRef, username);
  
  await updateDoc(docRef, {
    wins: increment(1),
  })
  .then(() => {
    console.log(username + " has won a game");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
}

export async function userLose(roomName, username){
  const colRef = collection(doc(db, "rooms", roomName), "users");
  const docRef = doc(colRef, username);
  
  await updateDoc(docRef, {
    wins: increment(-1),
  })
  .then(() => {
    console.log(username + " has lost a game");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
}

//add winners array to round# at the end of round, addRound updates the room document
export async function addWinnersToNextRound(roomName, rounds, winners) {
  const docRef = doc(db, "rooms", roomName);

  try {
    const winPromises = winners.map(async (winner) => {
      const colRef = collection(docRef, "round" + rounds);
      await setDoc(doc(colRef, winner.name), winner);
      console.log('Document created in ' + rounds + " " + winner.name);
    });

    await Promise.all(winPromises);
    console.log('Objects added to Firestore successfully');
  } catch(e){
    console.error('Error adding objects to Firestore:', e);
  }
}

export async function winnerToNextRound(roomName, rounds, winners) {
  // const colRef = collection(doc(db, "rooms", roomName), "round" + rounds);
  // await setDoc(doc(colRef, winner.name), winner)
  // .then((doc) => {
  //   console.log(winner.name + " autoadded to next round " + rounds);
  // })
  // .catch ((error) => {
  //   console.error ("Error updating document:", error);
  // })
}

export async function getRoom(roomName) {
  var room;
  await getDoc(doc(db, "rooms", roomName))
  .then((doc) => {
    if (doc.exists()) {
      room = doc.data();
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });
  
  return room;
}

export async function getUser(name) {
  var user;
  await getDoc(doc(db, "users", name))
  .then((doc) => {
    if (doc.exists()) {
      // console.log("Document data:", doc.data());
      user = doc.data();
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });
  
  return user;
}

export async function uploadImage(username, file, file2){
  var fileList = [];
  fileList.push(file);
  fileList.push(file2);
  for(var i = 0; i < 2; i++){
    const storageRef = ref(storage, '/' + username + '/' + fileList[i].name);
    await uploadBytes(storageRef, fileList)
    .then((snapshot) => {
      console.log('Uploaded a blob or file!')
    })
    .catch((error) => {
        console.log("Error getting document:", error);
      });
  }
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

export async function addBalanceStripe(username){
  const uuid = uuidv4();
  console.log(uuid);
  const colRef = collection(db, "customers", uuid, "checkout_sessions");
  await addDoc(colRef, {
    "mode": "payment",
    "price": "price_1NZfrHKeC6UCUS43GapvvWkm",
    "success_url":
        "http://localhost:3000/profile",
    "cancel_url":
        "http://localhost:3000/profile"
  })
  .then((docRef) => {
    console.log("Balance added $10");
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}

// Replace with your Firebase configuration

export async function openRooms() {
  var rooms = [];

  const colRef = collection(db, "rooms");
  const docsSnap = await getDocs(colRef);
  docsSnap.forEach(doc => {
    rooms.push(doc.data());
  })
  return rooms;
};


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

