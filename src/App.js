import './App.css';
import {useEffect, useState} from "react";
import {getExpenses, createExpense} from "./api";
import {fromTimestampToLocalDate} from "./utils";

function App() {
  const [currentExp, setCurrentExp] = useState({date: "", value: ""});
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    (async () => {
      const exp = await getExpenses();
      exp.sort((a, b) => a.date.seconds - b.date.seconds);
      setExpenses(exp);
    })();
  }, []);

  const dateChangeHandler = (evt) => {
    setCurrentExp({...currentExp, date: evt.target.value});
  };
  const expValueChangeHandler = (evt) => {
    setCurrentExp({...currentExp, value: evt.target.value});
  };
  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    createExpense(currentExp).then(() => {
      setCurrentExp({date: "", value: ""})
    });
  };

  return (
    <div className="app">
      <header className="app__header header">
        <h1 className="header__title title">Expense viewer</h1>
      </header>
      <main className="app__main main">
        <form className="form main__form">
          <input type="date" onChange={dateChangeHandler} value={currentExp.date} />
          <input type="number" onChange={expValueChangeHandler} value={currentExp.value} />
          <input type="submit" onClick={formSubmitHandler}/>
        </form>
        <div>
          <table>
            <tbody>
              {expenses.map((it, index, arr) => {
                const localDate = fromTimestampToLocalDate(it.date);
                if (index === 0 || localDate !== fromTimestampToLocalDate(arr[index-1].date)) {
                  return (
                    <tr key={index}>
                      <td>{localDate}</td>
                      <td>{Number(it.value).toFixed(2)}</td>
                    </tr>
                  );
                }

                return (
                  <tr key={index}>
                    <td />
                    <td>{it.value}</td>
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
