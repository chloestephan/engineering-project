import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const DefaultInputLabel = ({ inputName, inputLabel, validInput, inputValue }) => {
  return (
    <label htmlFor={inputName}>
      {inputLabel} 
      <span className={validInput ? "valid" : "hide"}>
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <span className={validInput || !inputValue || validInput === null ? "hide" : "invalid"}>
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </label>
  );
};

export default DefaultInputLabel;
