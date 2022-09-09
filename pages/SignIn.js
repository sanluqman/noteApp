import React, { useEffect, useState } from "react";
import { app, database } from "../firebaseConfig";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";

const SignIn = () => {
  const router = useRouter();
  let auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        router.push("/Main");
        // ...
      } else {
        // router.push("/");
        console.log("not loggedin");
      }
    });
  }, []);

  const [data, setData] = useState({});
  const [savedData, setSavedData] = useState([]);

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setData({ ...data, ...newInput });
  };

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        // console.log(response.user);
        setSavedData(response.user);
        router.push("/Main");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="w-screen h-screen bg-green-600 flex justify-center items-center">
      <div className="w-[500px] h-[400px] bg-green-800 rounded-xl flex justify-center items-center flex-col">
        <h1>SignIn</h1>
        <input
          name="email"
          placeholder="Email"
          onChange={(event) => handleInput(event)}
          className="bg-green-600 m-2 p-2 text-center rounded-md mt-5"
        />
        <input
          name="password"
          placeholder="Password"
          onChange={(event) => handleInput(event)}
          className="bg-green-600 m-2 p-2 text-center rounded-md mb-5"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 m-2 p-2 text-center rounded-md"
        >
          submit
        </button>
        <Link href="/SignUp">
          <h1 className="mt-4 hover:text-white">Create New Account</h1>
        </Link>
        {/* {savedData && savedData.uid} */}
      </div>
    </div>
  );
};

export default SignIn;
