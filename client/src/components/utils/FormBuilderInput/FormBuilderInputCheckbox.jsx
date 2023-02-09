import { FormContext } from "./FormBuilderContext";
import { useContext } from "react";

const FormBuilderInputCheckbow = ({ inputId, inputValue }) => {
  const { handleChange } = useContext(FormContext);
  return (
    <input
      id={inputId}
      type="checkbox"
      checked={inputValue}
      onChange={(event) => handleChange(inputId, event)}
    />
  );
};

export default FormBuilderInputCheckbow;
