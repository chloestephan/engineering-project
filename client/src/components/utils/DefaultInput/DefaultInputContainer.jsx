import DefaultInputLabel from "./DefaultInputLabel";
import DefaultInputField from "./DefaultInputField";
import DefaultInputNote from "./DefaultInputNote";

const DefaultInputContainer = ({
  inputName,
  inputLabel,
  inputRef = null,
  inputValue,
  inputFocus,
  inputType = "text",
  setInputValue,
  setInputFocus = null,
  validInput = null,
  noteValidInput = null,
}) => {
  return (
    <div className={inputName + "-container"}>
      <DefaultInputLabel
        inputName={inputName}
        inputLabel={inputLabel}
        validInput={validInput}
        inputValue={inputValue}
      />

      <DefaultInputField
        inputName={inputName}
        validInput={validInput}
        inputRef={inputRef}
        setInputFocus={setInputFocus}
        setInputValue={setInputValue}
        inputType={inputType}
      />

      {noteValidInput && (
        <DefaultInputNote
          inputName={inputName}
          validInput={validInput}
          inputValue={inputValue}
          inputFocus={inputFocus}
          noteValidInput={noteValidInput}
        />
      )}
    </div>
  );
};

export default DefaultInputContainer;
