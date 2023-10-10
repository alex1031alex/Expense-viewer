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

    const aStamp = fromStringToTimestamp(a.date);
    const bStamp = fromStringToTimestamp(b.date);

    if (aStamp.seconds === bStamp.seconds && a.isIncome === true && b.isIncome === false) {
      return -1;
    }

    if (aStamp.seconds === bStamp.seconds && a.isIncome === false && b.isIncome === true) {
      return 1;
    }

    return aStamp.seconds - bStamp.seconds;
  });
};

export const convertRecordToClientFormat = (record) => {
  return {...record,
    value: {income: record.isIncome ? record.value : 0, expense: !record.isIncome ? record.value : 0},
    date: fromTimestampToLocalDate(record.date)
  };
};

export const convertRecordsToClientFormat = (records) => {
  return sortRecordsByDate(records.map(convertRecordToClientFormat));
};

export const getTotal = (records) => {
  return records.reduce((acc, it) => {
      return {...acc, income: acc.income + Number(it.value.income), expense: acc.expense + Number(it.value.expense)}
  }, {income: 0, expense: 0});
};

