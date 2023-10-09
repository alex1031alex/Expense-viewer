import {Timestamp} from "firebase/firestore";

export const fromStringToTimestamp = (str) => {
  const date = new Date(str);

  if (!date) {
    return null;
  }

  return Timestamp.fromDate(date);
};

export const fromTimestampToLocalDate = (rowDate) => {
  if (rowDate instanceof Timestamp) {
    return new Date(rowDate.seconds * 1000).toLocaleDateString("en-US", {day: "2-digit",month: "long", year: "numeric"});
  }

  return new Date(rowDate).toLocaleDateString("en-US", {day: "2-digit",month: "long", year: "numeric"});
};

export const sortRecordsByDate = (records) => {
  return records.slice().sort((a, b) => {
    if (a.date.seconds === b.date.seconds && a.isIncome === true && b.isIncome === false) {
      return -1;
    }

    if (a.date.seconds === b.date.seconds && a.isIncome === false && b.isIncome === true) {
      return 1;
    }

    return a.date.seconds - b.date.seconds;
  });
};

export const getTotal = (records) => {
  return records.reduce((acc, it) => {
    if (it.isIncome) {
      return {...acc, income: acc.income + Number(it.value)}
    }

    return {...acc, expense: acc.expense + Number(it.value)}
  }, {income: 0, expense: 0});
};

