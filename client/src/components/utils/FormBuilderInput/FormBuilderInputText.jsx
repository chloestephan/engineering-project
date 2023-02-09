import { FormContext } from "./FormBuilderContext";
import { useContext } from "react";

const FormBuilderInputText = ({ inputId, isInputRequired, inputPlaceholder, inputValue }) => {
  const { handleChange } = useContext(FormContext);
  return (
    <input
      id={inputId}
      type="text"
      required={isInputRequired}
      placeholder={inputPlaceholder}
      value={inputValue}
      onChange={(event) => handleChange(inputId, event)}
    />
  );
};

export default FormBuilderInputText;
