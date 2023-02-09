import { useEffect, useState } from "react";
import { FormContext } from "../../utils/FormBuilderInput/FormBuilderContext";
import formJSON from "../../../data/form.json";
import FormBuilderInputContainer from "../../utils/FormBuilderInput/FormBuilderInputContainer";

const FillForm = () => {
  const [fields, setFields] = useState(null);
  useEffect(() => {
    setFields(formJSON);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO CHANGE VALUE FOR MULTIPLE SELECT WHEN SUBMIT AND ADD ALL THE SELECTED OPTIONS
    console.log(fields);
  };

  const handleChange = (id, event) => {
    const newFields = [...fields];
    const fieldsToUpdate = newFields.find((field) => field.id === id);
    if (fieldsToUpdate.type === "checkbox") {
      fieldsToUpdate.value = event.target.checked;
    } else {
      fieldsToUpdate.value = event.target.value;
    }
    setFields(newFields);
  };

  return (
    <section>
      <h1>Bienvenue !</h1>
      <FormContext.Provider value={{ handleChange }}>
        {formJSON.map((item) => (
          <div key={item.id}>
            <FormBuilderInputContainer
              inputId={item.id}
              inputLabel={item.label}
              inputType={item.type}
              isInputRequired={item.required ?? true}
              inputPlaceholder={item.placeholder ?? ""}
              inputOptions={item.options ?? []}
              inputValue={item.value}
              isMultiple={item.multiple ?? false}
            />
          </div>
        ))}
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </FormContext.Provider>
    </section>
  );
};

export default FillForm;
