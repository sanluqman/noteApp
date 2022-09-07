// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjzzSc4qCYtT6Kdjm6XXrnPlXFUwS_vLQ",
  authDomain: "learning-firebase-8f0ab.firebaseapp.com",
  projectId: "learning-firebase-8f0ab",
  storageBucket: "learning-firebase-8f0ab.appspot.com",
  messagingSenderId: "842228605707",
  appId: "1:842228605707:web:8fe9e386ac6a0abf58b80e",
};

export const app = firebase.initializeApp(firebaseConfig);
export const database = app.firestore();

// export const app = initializeApp(firebaseConfig);
// export const database = getFirestore(app);
