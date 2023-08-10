import './App.css';
import {useEffect, useState} from "react";
import {getExpenses} from "./api";

function App() {
  const [currentExp, setCurrentExp] = useState({date: "", value: ""});
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    (async () => {
      const exp = await getExpenses();
      console.log(typeof exp);
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
    console.log(currentExp);
    setExpenses((initial) => [...initial, currentExp]);
    setCurrentExp({date: "", value: ""});
    console.log(currentExp);
    console.log(expenses);
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
              {expenses.map((it, index) => {
                console.log(it, index);
                console.log(new Date(it.date.seconds * 1000).toLocaleDateString("en-US"));
                return (
                  <tr key={index}>
                    <td>{new Date(it.date.seconds * 1000).toLocaleDateString("en-US")}</td>
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
