import './App.css';
import {useEffect, useState} from "react";
import {fetchRecords} from "./api";
import {deleteRecordFromServer} from "./api";
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {Form} from "./components/Form/Form";
import {Detailed} from "./components/Detailed/Detailed";
import {Daily} from "./components/Daily/Daily";
import {Monthly} from "./components/Monthly/Monthly";

function App() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedRecords = await fetchRecords();
      setRecords(fetchedRecords);

    })();
  }, []);

  const deleteRecord = (id) => {
    deleteRecordFromServer(id)
      .then(() => {
      const updatedRecords = records.filter((it) => it.id !== id);
      setRecords(updatedRecords);
    });
  };

  const addNewRecord = (newRecord) => {
    setRecords([...records, newRecord]);
  };

  return (
    <div className="app">
        <Header className="app__header" />
        <main className="app__main main">
          <div className="container">
            <Form className="main__form" addNewRecord={addNewRecord}/>
            <div>
              <Detailed records={records} deleteRecord={deleteRecord}/>
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
