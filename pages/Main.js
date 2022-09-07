import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { app, database } from "../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  addDoc,
} from "firebase/firestore";
import Left from "../components/Left";
import Right from "../components/Right";

// const getSingleNote = (id) => {
//   setID(id)
// }

const Main = () => {
  const router = useRouter();
  let auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        // console.log(uid);
        router.push("/Main");
        // ...
      } else {
        router.push("/");
        console.log("not loggedin");
      }
    });
  }, []);
  const [ID, setID] = useState(null);
  const getSingleNote = (id) => {
    setID(id);
  };

  return (
    <div className="w-screen h-screen flex justify-between bg-emerald-500  font-bold font-mono">
      <Left getSingleNote={getSingleNote} />
      <Right ID={ID} />
    </div>
  );
};

export default Main;
