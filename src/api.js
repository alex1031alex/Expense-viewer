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

export const getExpenses = async () => {
  const db = getFirestore();
  const expenses = [];

  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      expenses.push({id: doc.id, ...data});
    })
  } catch (error) {
    return Promise.reject(error);
  }

  return expenses;
}

export const createExpense = async (data) => {
  const db = getFirestore();
  const stamp = fromStringToTimestamp(data.date);

  data = {...data, date: stamp};
  try {
    await addDoc(collection(db, COLLECTION_NAME), data);
  } catch(error) {
    return Promise.reject(error);
  }
};

export const deleteEntry = async (id) => {
  const db = getFirestore();
  const ref = doc(db, COLLECTION_NAME, id);

  try {
    await deleteDoc(ref);
  } catch (error) {
    return Promise.reject(error);
  }

};