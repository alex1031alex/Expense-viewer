import "./Detailed.css";
import {Table} from "../Table/Table";
import {useSelector} from "react-redux";
import {getRecords} from "../../store/selectors";

export const Detailed = () => {
  const records = useSelector(getRecords);

  return (
    <section className="detailed">
      <h2 className="detailed__title">Detailed</h2>
      <Table records={records} className="detailed__table" isDeleting={true} />
    </section>
  );
};