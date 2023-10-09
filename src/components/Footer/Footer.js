import "./Footer.css";
import classNames from "classnames";

export const Footer = ({className}) => {
  return (
    <footer className={classNames(className, "footer")}>
      <div className="container">
        <p className="footer__text">Developed by Alex Alexandrov</p>
        <p className="footer__text">2023</p>
      </div>
    </footer>
  );
};