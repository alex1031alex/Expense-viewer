import "./Detailed.css";
import {useState} from "react";
import {fromTimestampToLocalDate, sortRecordsByDate, getTotal} from "../../utils";
import angleArrow from "../../icons/angle-arrow.svg";
import classNames from "classnames";
import {DeleteButton} from "../Delete-button/Delete-button";

export const Detailed = ({records, deleteRecord}) => {
  const [isShown, setIsShown] = useState(false);

  const hideButtonClickHandler = () => {
    setIsShown(!isShown);
  };

  return (
    <section className="detailed">
      <h2 className="detailed__title">Detailed</h2>
      <table className="detailed__table table">
        <thead>
        <tr>
          <th className="table__col table__col--1">
            <div className="table__flex-wrap">Дата
              <button type="button" className={classNames("button", "button--hide", {inverted: !isShown})} onClick={hideButtonClickHandler}><img alt="Показать/скрыть детальную информацию" src={angleArrow} /></button>
            </div>
          </th>
          <th className="table__col table__col--2">Приход</th>
          <th className="table__col table__col--3">Расход</th>
          <th className="table__col table__col--4">Удалить запись</th>
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
        {isShown && sortRecordsByDate(records).map((it, index, arr) => {
          const localDate = fromTimestampToLocalDate(it.date);
          const isLocalDateNeeded = index === 0 || localDate !== fromTimestampToLocalDate(arr[index-1].date);
          return (
            <tr key={index}>
              <td className="table__col table__col--1">{isLocalDateNeeded && localDate}</td>
              <td className="table__col table__col--2">{it.isIncome && Number(it.value).toFixed(2)}</td>
              <td className="table__col table__col--3">{!it.isIncome && Number(it.value).toFixed(2)}</td>
              <td className="table__col table__col--4"><DeleteButton id={it.id} onClick={deleteRecord} /></td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </section>
  );
};