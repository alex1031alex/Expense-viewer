import "./Detailed.css";
import {Table} from "../Table/Table";

export const Detailed = ({records, deleteRecord}) => {

  return (
    <section className="detailed">
      <h2 className="detailed__title">Detailed</h2>
      <Table records={records} className="detailed__table" isDeleting={true} deleteRecord={deleteRecord} />
    </section>
  );
};