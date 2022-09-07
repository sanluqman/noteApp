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
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const Right = ({ ID }) => {
  const [singleNote, setSingleNote] = useState({});
  const [noteBody, setNoteBody] = useState("");
  const [noteTitle, setNoteTitle] = useState("");

  const dbInstance = collection(database, "note");

  const getSingleNote = async () => {
    if (ID) {
      const singleNote = doc(database, "note", ID);
      const data = await getDoc(singleNote);
      setSingleNote({ ...data.data(), id: data.id });
    }
  };

  const getNotes = () => {
    getDocs(dbInstance).then((data) => {
      setSingleNote(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })[0]
      );
    });
  };

  useEffect(() => {
    getNotes();
    if (singleNote) {
      setNoteBody(singleNote.body);
    }
  }, []);

  useEffect(() => {
    getSingleNote();
    if (singleNote) {
      setNoteBody(singleNote.body);
    }
  }, [ID]);

  const editNote = (id) => {
    const collectionById = doc(database, "note", id);

    updateDoc(collectionById, {
      body: noteBody,
    }).then(() => {
      //   window.location.reload();
      console.log("updated");
    });
  };

  const deleteNote = (id) => {
    const collectionById = doc(database, "note", id);

    if (
      window.confirm(`Are you sure you want to delete: ${singleNote.noteTitle}`)
    ) {
      deleteDoc(collectionById).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <div className="w-full bg-emerald-700 m-8 rounded-xl">
      <div className="flex text-orange-700 font-bold w-full h-16 justify-center items-center">
        {singleNote && singleNote.title}
      </div>
      <div className="flex justify-evenly">
        <button
          className="bg-orange-700 w-[120px] h-[40px]  rounded-lg font-bold"
          onClick={() => editNote(singleNote.id)}
        >
          save
        </button>
        <button
          className="bg-orange-700 w-[120px] h-[40px]  rounded-lg font-bold"
          onClick={() => deleteNote(singleNote.id)}
        >
          Delete
        </button>
      </div>
      <div className="flex justify-center items-center">
        <textarea
          name="body"
          id=""
          cols="100"
          rows="20"
          className="bg-emerald-600 w-full h-[450px] rounded-lg m-2"
          value={noteBody}
          onChange={(e) => setNoteBody(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default Right;
