import { app, database } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const [data, setData] = useState([]);
const [title, setTitle] = useState("");
const [note, setNote] = useState("");

const router = useRouter();
const auth = getAuth();
const collectionRef = collection(database, "note");

useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
      router.push("/Main");
      // ...
    } else {
      router.push("/");
      console.log("not loggedin");
    }
  });
}, []);

let addTitle = (e) => {
  setTitle(e.target.value);
};
let addNote = (e) => {
  setNote(e.target.value);
};

const sendData = () => {
  addDoc(collectionRef, {
    title: title,
    note: note,
  })
    .then(() => {
      alert("Data Added");
    })
    .catch((err) => {
      alert(err.message);
    });
};

const getData = () => {
  getDocs(collectionRef).then((response) => {
    setData(
      response.docs.map((item) => {
        // return item.data();
        return { ...item.data(), id: item.id };
      })
    );
  });
};

const updateData = (id) => {
  const docToUpdate = doc(database, "note", id);
  updateDoc(docToUpdate, {
    title: title,
    note: note,
  })
    .then(() => {
      alert("Data Updated");
    })
    .catch((err) => {
      alert(err.message);
    });
};

const deleteData = (id) => {
  const docToUpdate = doc(database, "note", id);
  deleteDoc(docToUpdate)
    .then(() => {
      alert("Data deleted");
    })
    .catch((err) => {
      alert(err.message);
    });
};
