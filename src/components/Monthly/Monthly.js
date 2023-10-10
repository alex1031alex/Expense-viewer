import "./Monthly.css";
import {Table} from "../Table/Table";

export const Monthly = ({records}) => {
  const monthlyRecordsMap = {};
  records.forEach((it) => {
    const monthName = new Date(it.date).toLocaleDateString("en-US", {month: "long", year: "numeric"});

    if (!monthlyRecordsMap[monthName]) {
      monthlyRecordsMap[monthName] = {income: Number(it.value.income), expense: Number(it.value.expense)};
      return;
    }

    monthlyRecordsMap[monthName].income += Number(it.value.income);
    monthlyRecordsMap[monthName].expense += Number(it.value.expense);
  });

  const monthlyRecords = Object.entries(monthlyRecordsMap).map((it) => {
    return {date: it[0], value: it[1]};
  }).slice().sort((a, b) => {return new Date(a.date) - new Date(b.date)});

  return (
    <section className="monthly">
      <h2 className="monthly__title">Monthly</h2>
      <Table records={monthlyRecords} className="monthly__table" />
    </section>
  );
};