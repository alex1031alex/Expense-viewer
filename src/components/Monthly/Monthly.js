import "./Monthly.css";
import {Table} from "../Table/Table";
import {useSelector} from "react-redux";
import {getMonthlyRecords} from "../../store/selectors";
import {LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid} from "recharts";

export const Monthly = () => {
  const monthlyRecords = useSelector(getMonthlyRecords);

  return (
    <section className="monthly">
      <h2 className="monthly__title">Monthly</h2>
      <Table records={monthlyRecords} className="monthly__table" />
      <div className="monthly__chart chart">
        <h3 className="chart__title">Line chart</h3>
        <LineChart data={monthlyRecords} width={900} height={400} className="chart__context">
          <Line type="monotone" stroke="#8884d8" dataKey="value.income"/>
          <Line type="monotone" stroke="#cc0000" dataKey="value.expense"/>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
        </LineChart>
      </div>
      <div className="monthly__chart chart">
        <h3 className="chart__title">Bar chart</h3>
        <BarChart data={monthlyRecords} width={900} height={400} className="chart__context">
          <XAxis dataKey="date" />
          <YAxis />
          <Bar barSize={30} fill="#274F7D" dataKey="value.income" />
          <Bar barSize={30} fill="#dd3333" dataKey="value.expense" />
        </BarChart>
      </div>
    </section>
  );
};