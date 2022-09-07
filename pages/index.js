import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import { Main } from "./Main";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Home() {
  const [logToMain, setLogToMain] = useState(false);
  const [siginOrSignUp, setSiginOrSignUp] = useState(false);

  return (
    <div className="w-screen h-screen bg-green-600 flex justify-center items-center">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {logToMain ? (
        <Main />
      ) : (
        <div className="w-[500px] h-[400px] bg-green-800 rounded-xl flex justify-center items-center flex-col">
          {siginOrSignUp ? <SignIn /> : <SignUp />}
        </div>
      )}
    </div>
  );
}
