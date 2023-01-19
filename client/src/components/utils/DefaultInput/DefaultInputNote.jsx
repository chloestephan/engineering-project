import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const DefaultInputNote = ({ inputName, validInput, inputValue, inputFocus, noteValidInput }) => {
  return (
    <p
      id={inputName + "-note"}
      className={inputFocus && inputValue && !validInput ? "instructions" : "offscreen"}
    >
      <FontAwesomeIcon icon={faInfoCircle} />
      {noteValidInput}
    </p>
  );
};

export default DefaultInputNote;
