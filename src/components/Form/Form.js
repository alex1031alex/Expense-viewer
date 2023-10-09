import "./Form.css";
import classNames from "classnames";
import {useState, useRef} from "react";
import {saveRecordOnServer} from "../../api";

const INITIAL_RECORD = {date: "", value: 0, isIncome: false, category: "other", id: ""};

export const Form = ({className, addNewRecord}) => {
  const [currentRecord, setCurrentRecord] = useState(INITIAL_RECORD);

  const buttonClickHandler = (evt) => {
    evt.preventDefault();

    if (!currentRecord.date || !currentRecord.value) {
      //Сообщение "Введите корректные данные"
      setCurrentRecord(INITIAL_RECORD);
      return;
    }

    let newRecord = {...currentRecord, isIncome: evt.currentTarget.dataset.isIncome === "true"};

    saveRecordOnServer(newRecord)
      .then((id) => {
        const recordWithId = {...newRecord, id: id}
        addNewRecord(recordWithId);
        setCurrentRecord({...currentRecord, id: "", value: 0, isIncome: false, category: "other"});
      });
  };

  const inputRef = useRef(null);
  const dateInputRef = useRef(null);

  const dateChangeHandler = (evt) => {
    setCurrentRecord({...currentRecord, date: evt.target.value});
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const expValueChangeHandler = (evt) => {
    setCurrentRecord({...currentRecord, value: evt.target.value});
  };

  return (
    <form className={classNames(className, "form")}>
      <input type="date" onChange={dateChangeHandler} value={currentRecord.date} ref={dateInputRef} />
      <input type="number" onChange={expValueChangeHandler} value={currentRecord.value !== 0 ? currentRecord.value : ""} ref={inputRef} />
      <input type="submit" onClick={buttonClickHandler} value="Расход" data-is-income="false" />
      <input type="submit" onClick={buttonClickHandler} value="Приход" data-is-income="true" />
    </form>
  );
};