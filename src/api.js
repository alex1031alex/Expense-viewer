import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  Timestamp
} from "firebase/firestore";

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
  // console.log(1, Timestamp.fromDate(new Date()));

  try {
    const querySnapshot = await getDocs(collection(db, "expensesCollection"));

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      expenses.push(data);
    })
  } catch (error) {
    return Promise.reject(error);
  }

  return expenses;
}

export const createExpense = async (data) => {
  const db = getFirestore();
  const stamp = Timestamp.fromDate(new Date(data.date));

  data = {...data, date: stamp};
  try {
    await addDoc(collection(db, "expensesCollection"), data);
  } catch(error) {
    return Promise.reject(error);
  }
};