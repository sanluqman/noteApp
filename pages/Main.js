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

  const [userUID, setUserUID] = useState("");

  const [darkBg, setDarkBg] = useState(false);
  const [seting, setSeting] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserUID(uid);
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

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log("user signed out");
    });
  };

  return (
    <div
      style={{ backgroundColor: darkBg ? "#10b981" : "#86efac" }}
      className="w-screen h-screen flex justify-between font-bold font-mono text-white "
    >
      {userUID && (
        <>
          <button
            className="absolute left-2 top-1 bg-orange-700 rounded-md p-1"
            onClick={() => setSeting((prevSeting) => !prevSeting)}
          >
            Setting
          </button>
          {seting && (
            <div className="absolute bg-orange-700 w-[300px] h-full flex justify-evenly items-center flex-col ">
              <button
                onClick={() => setSeting((prevSeting) => !prevSeting)}
                className="bg-black w-[120px] h-[40px]  rounded-lg font-bold"
              >
                close
              </button>
              <button
                onClick={() => setDarkBg((prevThyme) => !prevThyme)}
                className="bg-black w-[120px] h-[40px]  rounded-lg font-bold"
              >
                Change thyme
              </button>
              <button
                onClick={handleLogout}
                className="bg-black w-[120px] h-[40px]  rounded-lg font-bold"
              >
                Sign Out
              </button>
            </div>
          )}

          <Left getSingleNote={getSingleNote} userUID={userUID} />
          <Right ID={ID} userUID={userUID} />
        </>
      )}
    </div>
  );
};

export default Main;
