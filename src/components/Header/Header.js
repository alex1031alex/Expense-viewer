import "./Header.css";
import classNames from "classnames";

export const Header = ({className}) => {
  return (
    <header className={classNames(className, "header")}>
      <div className="container">
        <h1 className="header__title">Expense viewer</h1>
      </div>
    </header>
  );
};