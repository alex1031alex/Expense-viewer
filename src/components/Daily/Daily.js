import "./Daily.css";
import {fromTimestampToLocalDate} from "../../utils";
import {Table} from "../Table/Table";

export const Daily = ({records}) => {
  const dailyRecordsMap = {};
  records.forEach((it) => {
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

  const dailyRecords = Object.entries(dailyRecordsMap).map((it) => {
    return {date: it[0], value: it[1]};
  }).slice().sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <section className="daily">
      <h2 className="daily__title">Daily</h2>
      <Table records={dailyRecords} className="daily__table" />
    </section>
  );
};