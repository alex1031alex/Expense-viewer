import "./Delete-button.css";
import cross from "../../icons/cross.svg";

export const DeleteButton = (id, onClick) => {
  return (
    <button id={id} type="button" className="button-del" onClick={(evt)=> {onClick(evt.currentTarget.id)}}>
      <img alt="Удалить запись" src={cross} />
    </button>
  );
};
