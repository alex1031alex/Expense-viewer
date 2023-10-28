import './App.css';
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {Form} from "./components/Form/Form";
import {Detailed} from "./components/Detailed/Detailed";
import {Daily} from "./components/Daily/Daily";
import {Monthly} from "./components/Monthly/Monthly";
import {fetchRecordsThunk} from "./store/actions";
import {getRecords} from "./store/selectors";

function App() {
  const dispatch = useDispatch();
  const records = useSelector(getRecords);

  useEffect(() => {
    dispatch(fetchRecordsThunk());
  }, []);

  return (
    <div className="app">
        <Header className="app__header" />
        <main className="app__main main">
          <div className="container">
            <Form className="main__form" />
            <div>
              <Detailed />
              <Daily records={records} />
              <Monthly records={records} />
            </div>
          </div>
        </main>
      <Footer className="app__footer" />
    </div>
  );
}

export default App;
