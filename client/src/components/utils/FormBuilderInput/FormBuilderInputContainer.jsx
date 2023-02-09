import FormBuilderInputLabel from "./FormBuilderInputLabel";
import FormBuilderInputText from "./FormBuilderInputText";
import FormBuilderInputRadio from "./FormBuilderInputRadio";
import FormBuilderInputCheckbox from "./FormBuilderInputCheckbox";
import FormBuilderInputSelect from "./FormBuilderInputSelect";
import FormBuilderInputTextarea from "./FormBuilderInputTextarea";

const FormBuilderInputContainer = ({
  inputId,
  inputLabel,
  inputType,
  isInputRequired,
  inputPlaceholder,
  inputOptions,
  inputValue,
  isMultiple,
}) => {
  return (
    <div className={"input-container-" + inputId}>
      <FormBuilderInputLabel inputId={inputId} inputLabel={inputLabel} isInputRequired={isInputRequired} inputValue={inputValue} />
      {inputType === "text" && <FormBuilderInputText inputId={inputId} inputPlaceholder={inputPlaceholder} inputValue={inputValue} />}
      {inputType === "radio" && <FormBuilderInputRadio inputId={inputId} inputValue={inputValue} />}
      {inputType === "checkbox" && <FormBuilderInputCheckbox inputId={inputId} inputValue={inputValue} />}
      {inputType === "select" && <FormBuilderInputSelect inputId={inputId} inputOptions={inputOptions} inputValue={inputValue} isMultiple={isMultiple} />}
      {inputType === "textarea" && <FormBuilderInputTextarea inputId={inputId} inputPlaceholder={inputPlaceholder} inputValue={inputValue} />}
    </div>
  );
};

export default FormBuilderInputContainer;
