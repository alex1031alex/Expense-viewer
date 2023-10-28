import {fromTimestampToLocalDate} from "../utils";

export const getRecords = (state) => state.records;

export const getDailyRecords = (state) => {
  const dailyRecordsMap = {};
  state.records.forEach((it) => {
    const localDate = fromTimestampToLocalDate(it.date);

    if (!dailyRecordsMap[localDate]) {
      dailyRecordsMap[localDate] = {income: it.isIncome ? Number(it.value.income) : 0, expense: it.isIncome ? 0 : Number(it.value.expense)};
      return;
    }

    if (it.isIncome) {
      dailyRecordsMap[localDate].income += Number(it.value.income);
      return;
    }

    dailyRecordsMap[localDate].expense += Number(it.value.expense);
  });

  return Object.entries(dailyRecordsMap).map((it) => {
    return {date: it[0], value: it[1]};
  }).slice().sort((a, b) => new Date(a.date) - new Date(b.date));
};

export const getMonthlyRecords = (state) => {
  const monthlyRecordsMap = {};
  state.records.forEach((it) => {
    const monthName = new Date(it.date).toLocaleDateString("en-US", {month: "short", year: "numeric"});

    if (!monthlyRecordsMap[monthName]) {
      monthlyRecordsMap[monthName] = {income: Number(it.value.income), expense: Number(it.value.expense)};
      return;
    }

    monthlyRecordsMap[monthName].income += Number(it.value.income);
    monthlyRecordsMap[monthName].expense += Number(it.value.expense);
  });

  return Object.entries(monthlyRecordsMap).map((it) => {
    return {date: it[0], value: it[1]};
  }).slice().sort((a, b) => {return new Date(a.date) - new Date(b.date)});
};