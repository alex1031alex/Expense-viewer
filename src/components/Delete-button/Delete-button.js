import "./Delete-button.css";
import cross from "../../icons/cross.svg";
import {useDispatch} from "react-redux";
import {deleteRecordThunk} from "../../store/actions";


export const DeleteButton = ({id}) => {
  const dispatch = useDispatch();

  const clickHandler = (evt) => {
    const id = evt.currentTarget.id;
    dispatch(deleteRecordThunk(id));
  };

  return (
    <button id={id} type="button" className="button-del" onClick={clickHandler}>
      <img alt="Удалить запись" src={cross} />
    </button>
  );
};
