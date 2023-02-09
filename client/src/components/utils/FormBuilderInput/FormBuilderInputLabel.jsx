const FormBuilderInputLabel = ({ inputId, inputLabel, isInputRequired }) => {
  return (
    <label htmlFor={"input-" + inputId} className="form-label">
      {inputLabel} {isInputRequired && <span className="text-danger">*</span>}
    </label>
  );
};

export default FormBuilderInputLabel;
