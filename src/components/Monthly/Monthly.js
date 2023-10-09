import "./Monthly.css";
import {useState} from "react";
import {getTotal} from "../../utils";
import angleArrow from "../../icons/angle-arrow.svg";
import classNames from "classnames";

export const Monthly = ({records}) => {
  const [isShown, setIsShown] = useState(false);

  const hideButtonClickHandler = () => {
    setIsShown(!isShown);
  };

  const monthlyRecords = {};
  records.forEach((it) => {
    const monthName = new Date(it.date.seconds * 1000).toLocaleDateString("en-US", {month: "long", year: "numeric"});

    if (!monthlyRecords[monthName]) {
      monthlyRecords[monthName] = {income: it.isIncome ? Number(it.value) : 0, expense: it.isIncome ? 0 : Number(it.value)};
      return;
    }

    if (it.isIncome) {
      monthlyRecords[monthName].income += Number(it.value);
      return;
    }

    monthlyRecords[monthName].expense += Number(it.value);
  });

  const sortedRecordEntries = Object.entries(monthlyRecords).slice().sort((a, b) => new Date(a[0]) - new Date(b[0]));

  return (
    <section className="monthly">
      <h2 className="monthly__title">Monthly</h2>
      <table className="monthly__table table">
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