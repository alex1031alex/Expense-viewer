import {Timestamp} from "firebase/firestore";

export const fromStringToTimestamp = (str) => {
  const date = new Date(str);

  if (!date) {
    return null;
  }

  return Timestamp.fromDate(date);
};

export const fromTimestampToLocalDate = (timestamp) => {
  if (timestamp instanceof Timestamp) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US");
  }

  throw Error("Incorrect data. This is not an instance of Timestamp class");
};