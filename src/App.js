import './App.css';
import {useEffect, useState, useRef} from "react";
import {fetchRecords, addRecord} from "./api";
import {fromTimestampToLocalDate, sortRecordsByDate} from "./utils";
import cross from "./icons/cross.svg";
import {deleteRecord} from "./api";

const INITIAL_RECORD = {date: "", value: 0, isIncome: false, category: "other", id: ""};

function App() {
  const [currentRecord, setCurrentRecord] = useState(INITIAL_RECORD);
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState({income: 0, expense: 0});

  const inputRef = useRef(null);
  const dateInputRef = useRef(null);

  useEffect(() => {
    (async () => {
      const fetchedRecords = await fetchRecords();
      setRecords(fetchedRecords);

    })();
  }, []);

  useEffect(() => {
    const totalIncome = records.reduce((acc, it) => {
      if (it.isIncome) {
        return acc + Number(it.value);
      }

      return acc;
    }, 0);

    const totalExpense = records.reduce((acc, it) => {
      if (it.isIncome) {
        return acc;
      }

      return acc + Number(it.value);
    }, 0);

    setTotal({...total, income: +totalIncome.toFixed(2), expense: +totalExpense.toFixed(2)})
  }, [records]);

  const dateChangeHandler = (evt) => {
    setCurrentRecord({...currentRecord, date: evt.target.value});
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const expValueChangeHandler = (evt) => {
    setCurrentRecord({...currentRecord, value: evt.target.value});
  };
  const delButtonClickHandler = (evt) => {
    const id = evt.currentTarget.id;
    deleteRecord(id)
      .then(() => {
      const updatedRecords = records.filter((it) => it.id !== id);
      setRecords(updatedRecords);
    });
  };
  const formSubmitHandler = (evt) => {
    evt.preventDefault();

    if (!currentRecord.date || !currentRecord.value) {
      //Сообщение "Введите корректные данные"
      setCurrentRecord(INITIAL_RECORD);
      return;
    }

    let newRecord = {...currentRecord, isIncome: evt.currentTarget.dataset.isIncome === "true"};
    addRecord(newRecord)
      .then((recordId) => {
      newRecord = {...newRecord, id: recordId};
      setCurrentRecord({...currentRecord, id: "", value: 0, isIncome: false, category: "other"});
      setRecords([...records, newRecord]);
    });
  };

  return (
    <div>
      <div className="app container">
        <header className="app__header header">
          <h1 className="header__title title">Expense viewer</h1>
        </header>
        <main className="app__main main">
          <form className="form main__form">
            <input type="date" onChange={dateChangeHandler} value={currentRecord.date} ref={dateInputRef} />
            <input type="number" onChange={expValueChangeHandler} value={currentRecord.value !== 0 ? currentRecord.value : ""} ref={inputRef} />
            <input type="submit" onClick={formSubmitHandler} value="Расход" data-is-income="false" />
            <input type="submit" onClick={formSubmitHandler} value="Приход" data-is-income="true" />
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
              <tfoot className="table__footer">
                <tr>
                  <td className="table__col table__col--1">Total</td>
                  <td className="table__col table__col--2">{total.income}</td>
                  <td className="table__col table__col--3">{total.expense}</td>
                  <td className="table__col table__col--4"/>
                </tr>
              </tfoot>
              <tbody>
                {sortRecordsByDate(records).map((it, index, arr) => {
                  const localDate = fromTimestampToLocalDate(it.date);
                  const isLocalDateNeeded = index === 0 || localDate !== fromTimestampToLocalDate(arr[index-1].date);
                    return (
                      <tr key={index}>
                        <td className="table__col table__col--1">{isLocalDateNeeded && localDate}</td>
                        <td className="table__col table__col--2">{it.isIncome && Number(it.value).toFixed(2)}</td>
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
      <footer className="app__footer footer" />
    </div>
  );
}

export default App;
