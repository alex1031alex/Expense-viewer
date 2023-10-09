import "./Daily.css";
import {useState} from "react";
import {fromTimestampToLocalDate, getTotal} from "../../utils";
import angleArrow from "../../icons/angle-arrow.svg";
import classNames from "classnames";

export const Daily = ({records}) => {
  const [isShown, setIsShown] = useState(false);

  const hideButtonClickHandler = () => {
    setIsShown(!isShown);
  };

  const dailyRecords = {};
  records.forEach((it) => {
    const localDate = fromTimestampToLocalDate(it.date);

    if (!dailyRecords[localDate]) {
      dailyRecords[localDate] = {income: it.isIncome ? Number(it.value) : 0, expense: it.isIncome ? 0 : Number(it.value)};
      return;
    }

    if (it.isIncome) {
      dailyRecords[localDate].income += Number(it.value);
      return;
    }

    dailyRecords[localDate].expense += Number(it.value);
  });

  const sortedRecordEntries = Object.entries(dailyRecords).slice().sort((a, b) => new Date(a[0]) - new Date(b[0]));

  return (
    <section className="daily">
      <h2 className="daily__title">Daily</h2>
      <table className="daily__table table">
        <thead>
        <tr>
          <th className="table__col table__col--1">
            <div className="table__flex-wrap">Дата
              <button type="button" className={classNames("button", "button--hide", {inverted: !isShown})} onClick={hideButtonClickHandler}><img alt="Показать/скрыть детальную информацию" src={angleArrow} /></button>
            </div>
          </th>
          <th className="table__col table__col--2">Приход</th>
          <th className="table__col table__col--3">Расход</th>
          <th className="table__col table__col--4">Комментарий</th>
        </tr>
        </thead>
        <tfoot className="table__footer">
        <tr>
          <td className="table__col table__col--1">Total</td>
          <td className="table__col table__col--2">{getTotal(records).income.toFixed(2)}</td>
          <td className="table__col table__col--3">{getTotal(records).expense.toFixed(2)}</td>
          <td className="table__col table__col--4"/>
        </tr>
        </tfoot>
        <tbody>
        {isShown && sortedRecordEntries.map((it, index, arr) => {
          return (
            <tr key={index}>
              <td className="table__col table__col--1">{it[0]}</td>
              <td className="table__col table__col--2">{it[1].income.toFixed(2)}</td>
              <td className="table__col table__col--3">{it[1].expense.toFixed(2)}</td>
              <td className="table__col table__col--4"/>
            </tr>
          );
        })}
        </tbody>
      </table>
    </section>
  );
};