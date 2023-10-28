import "./Daily.css";
import {useSelector} from "react-redux";
import {getDailyRecords} from "../../store/selectors";
import {Table} from "../Table/Table";

export const Daily = () => {
  const dailyRecords = useSelector(getDailyRecords);

  return (
    <section className="daily">
      <h2 className="daily__title">Daily</h2>
      <Table records={dailyRecords} className="daily__table" />
    </section>
  );
};