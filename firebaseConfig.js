// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGEBOCKET,
  messagingSenderId: process.env.MESSAG,
  appId: process.env.APPID,
};

export const app = firebase.initializeApp(firebaseConfig);
export const database = app.firestore();

// export const app = initializeApp(firebaseConfig);
// export const database = getFirestore(app);
