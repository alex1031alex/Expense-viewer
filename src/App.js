import './App.css';
import {useEffect, useState} from "react";
import {getExpenses, createExpense} from "./api";
import {fromTimestampToLocalDate} from "./utils";
import cross from "./icons/cross.svg";
import {deleteEntry} from "./api";

function App() {
  const [currentExp, setCurrentExp] = useState({date: "", value: "", isIncome: false});
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    (async () => {
      const exp = await getExpenses();
      const sortedExp = exp.slice().sort((a, b) => {
        if (a.date.seconds === b.date.seconds && a.isIncome === true && b.isIncome === false) {
          return -1;
        }

        if (a.date.seconds === b.date.seconds && a.isIncome === false && b.isIncome === true) {
          return 1;
        }

        return a.date.seconds - b.date.seconds;
      });
      setExpenses(sortedExp);
    })();
  }, []);

  const dateChangeHandler = (evt) => {
    setCurrentExp({...currentExp, date: evt.target.value});
  };
  const expValueChangeHandler = (evt) => {
    setCurrentExp({...currentExp, value: evt.target.value});
  };
  const delButtonClickHandler = (evt) => {
    const id = evt.currentTarget.id;
    deleteEntry(id).then(() => {});
  };
  const formSubmitHandler = (evt) => {
    console.log(evt.currentTarget.dataset);
    evt.preventDefault();
    console.log(evt.currentTarget.dataset.isIncome === "true");
    createExpense({...currentExp, isIncome: evt.currentTarget.dataset.isIncome === "true"}).then(() => {
      setCurrentExp({...currentExp, date: "", value: "", isIncome: false})
    });
  };

  return (
    <div className="app container">
      <header className="app__header header">
        <h1 className="header__title title">Expense viewer</h1>
      </header>
      <main className="app__main main">
        <form className="form main__form">
          <input type="date" onChange={dateChangeHandler} value={currentExp.date} />
          <input type="number" onChange={expValueChangeHandler} value={currentExp.value} />
          <input type="submit" onClick={formSubmitHandler} value="Приход" data-is-income="true" />
          <input type="submit" onClick={formSubmitHandler} value="Расход" data-is-income="false" />
        </form>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th className="table__col table__col--1">Дата</th>
                <th className="table__col table__col--2">Приход</th>
                <th className="table__col table__col--3">Расход</th>
                <th className="table__col table__col--4">Удалить запись</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((it, index, arr) => {
                const localDate = fromTimestampToLocalDate(it.date);
                if (index === 0 || localDate !== fromTimestampToLocalDate(arr[index-1].date)) {
                  return (
                    <tr key={index}>
                      <td className="table__col table__col--1">{localDate}</td>
                      <td className="table__col table__col--2">{it.isIncome && Number(it.value).toFixed(2)}</td>
                      <td className="table__col table__col--3">{!it.isIncome && Number(it.value).toFixed(2)}</td>
                      <td className="table__col table__col--4"><button id={it.id} type="button" className="button button--del" onClick={delButtonClickHandler}><img alt="Удалить запись" src={cross} /></button></td>
                    </tr>
                  );
                }

                return (
                  <tr key={index}>
                    <td className="table__col table__col--1" />
                    <td className="table__col table__col--2" >{it.isIncome && Number(it.value).toFixed(2)}</td>
                    <td className="table__col table__col--3">{!it.isIncome && Number(it.value).toFixed(2)}</td>
                    <td className="table__col table__col--4"><button id={it.id} type="button" className="button button--del" onClick={delButtonClickHandler}><img alt="Удалить запись" src={cross} /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
