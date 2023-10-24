import "./Detailed.css";
import {Table} from "../Table/Table";

export const Detailed = ({records}) => {

  return (
    <section className="detailed">
      <h2 className="detailed__title">Detailed</h2>
      <Table records={records} className="detailed__table" isDeleting={true} />
    </section>
  );
};