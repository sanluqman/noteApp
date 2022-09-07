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

const Left = ({ getSingleNote }) => {
  const [addingNewNote, setAddingNewNote] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [firebaseData, setFirebaseData] = useState([]);

  const addNewNote = () => {
    setAddingNewNote((prev) => !prev);
  };

  const collectionRef = collection(database, "note");

  const saveNewNote = async () => {
    if (noteTitle.length < 1) return alert("add note title");
    addDoc(collectionRef, {
      title: noteTitle,
      body: noteBody,
    })
      .then(() => {
        // alert("Data Added");
        setNoteTitle("");
        setAddingNewNote(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getData = () => {
    onSnapshot(collectionRef, (data) => {
      setFirebaseData(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-[25%] bg-emerald-700 m-8 rounded-xl flex flex-col items-center">
      <button
        className="bg-orange-700 w-[120px] h-[40px] m-5 rounded-lg font-bold"
        onClick={addNewNote}
      >
        {addingNewNote ? "cancel" : "add new note"}
      </button>
      {addingNewNote && (
        <div className="flex flex-col items-center">
          <input
            type="text"
            className="bg-orange-700 w-[200px] h-[40px] m-1 rounded-lg p-5"
            placeholder="Note Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <button
            className="bg-orange-700 w-[120px] h-[40px] m-5 rounded-lg font-bold"
            onClick={saveNewNote}
          >
            Save
          </button>
        </div>
      )}
      <div className="overflow-y-scroll scrollbar">
        {firebaseData.sort().map((title) => (
          <div
            key={title.id}
            className="bg-orange-700 w-[180px] h-[60px] rounded-md m-2 flex items-center justify-center min-h-[60px] "
            onClick={() => getSingleNote(title.id)}
          >
            <h1>{title.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Left;
