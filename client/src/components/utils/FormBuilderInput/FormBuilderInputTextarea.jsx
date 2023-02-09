import { FormContext } from "./FormBuilderContext";
import { useContext } from "react";

const FormBuilderInputTextarea = ({ inputId, isInputRequired, inputPlaceholder, inputValue }) => {
  const { handleChange } = useContext(FormContext);
  return (
    <input
      id={inputId}
      type="textarea"
      required={isInputRequired}
      placeholder={inputPlaceholder}
      value={inputValue}
      onChange={(event) => handleChange(inputId, event)}
    />
  );
};

export default FormBuilderInputTextarea;
