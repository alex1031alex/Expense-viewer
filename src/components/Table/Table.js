import "./Table.css";
import classNames from "classnames";
import {useDispatch} from "react-redux";
import angleArrow from "../../icons/angle-arrow.svg";
import {getTotal} from "../../utils";
import {DeleteButton} from "../Delete-button/Delete-button";
import {useState} from "react";

export const Table = ({records, className, isDeleting=false}) => {
  const [isShown, setIsShown] = useState(false);

  const hideButtonClickHandler = () => {
    setIsShown(!isShown);
  };

  return (
    <table className={classNames("table", className)}>
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
        {isDeleting && <th className="table__col table__col--5">Удалить запись</th>}
      </tr>
      </thead>
      <tfoot className="table__footer">
        <tr>
          <td className="table__col table__col--1">Total</td>
          <td className="table__col table__col--2">{new Intl.NumberFormat("ru", {minimumFractionDigits: 2, maximumFractionDigits: 2} ).format(getTotal(records).income)}</td>
          <td className="table__col table__col--3">{new Intl.NumberFormat("ru", {minimumFractionDigits: 2, maximumFractionDigits: 2} ).format(getTotal(records).expense)}</td>
          <td className="table__col table__col--4"/>
          {isDeleting && <th className="table__col table__col--5" />}
        </tr>
      </tfoot>
      <tbody>
      {isShown && records.map((it, index, arr) => {
        const isLocalDateNeeded = index === 0 || it.date !== arr[index-1].date;
        return (
          <tr key={index}>
            <td className="table__col table__col--1">{isLocalDateNeeded && it.date}</td>
            <td className="table__col table__col--2">{it.value.income !== 0 && new Intl.NumberFormat("ru", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(it.value.income)}</td>
            <td className="table__col table__col--3">{it.value.expense !== 0 && new Intl.NumberFormat("ru", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(it.value.expense)}</td>
            <td className="table__col table__col--4"/>
            {isDeleting && <td className="table__col table__col--5"><DeleteButton id={it.id} /></td>}
          </tr>
        );
      })}
      </tbody>
    </table>
  );
};