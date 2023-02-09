import { FormContext } from "./FormBuilderContext";
import { useContext } from "react";

const FormBuilderInputSelect = ({ inputId, inputOptions, isMultiple }) => {
  const { handleChange } = useContext(FormContext);
  return (
    <select id={inputId} name={inputId} onChange={(event) => handleChange(inputId, event)} multiple={isMultiple}>
      {inputOptions.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FormBuilderInputSelect;
