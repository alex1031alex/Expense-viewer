import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  addDoc,
  deleteDoc
} from "firebase/firestore";
import {fromStringToTimestamp} from "./utils";

const COLLECTION_NAME = "expensesCollection";
const firebaseConfig = {
  apiKey: "AIzaSyCV73OAQv7JdDlUtJRqMLj1sJGIDV6dlUU",
  authDomain: "expense-view-7d01d.firebaseapp.com",
  projectId: "expense-view-7d01d",
  storageBucket: "expense-view-7d01d.appspot.com",
  messagingSenderId: "472175389158",
  appId: "1:472175389158:web:fb78ed273e2f7a7b7a4e27"
};

export const initializeAPI = () => {
  const app = initializeApp(firebaseConfig);
  getFirestore(app);

  return app;
};

export const fetchRecords = async () => {
  const db = getFirestore();
  const records = [];

  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      records.push({...data, id: doc.id});
    })
  } catch (error) {
    return Promise.reject(error);
  }

  return records;
}

export const addRecord = async data => {
  const db = getFirestore();
  const stamp = fromStringToTimestamp(data.date);

  data = {...data, date: stamp};
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), data);
    return docRef.id;
  } catch(error) {
    return Promise.reject(error);
  }
};

export const deleteRecord = async id => {
  const db = getFirestore();
  const ref = doc(db, COLLECTION_NAME, id);

  try {
    await deleteDoc(ref);
  } catch (error) {
    console.log("Ошибка удаления");
    return Promise.reject(error);
  }
};