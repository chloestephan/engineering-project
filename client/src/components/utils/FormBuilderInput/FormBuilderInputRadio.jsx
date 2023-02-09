import { FormContext } from "./FormBuilderContext";
import { useContext } from "react";

const FormBuilderInputRadio = ({ inputId, inputValue }) => {
  const { handleChange } = useContext(FormContext);
  return (
    <input
      id={inputId}
      type="radio"
      checked={inputValue}
      onChange={(event) => handleChange(inputId, event)}
    />
  );
};

export default FormBuilderInputRadio;
