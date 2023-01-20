const DefaultInputField = ({ inputName, validInput, inputRef, setInputFocus, setInputValue, inputType }) => {
  return (
    <>
      <input
        type={inputType}
        id={inputName}
        ref={inputRef}
        autoComplete="off"
        onChange={(e) => setInputValue(e.target.value)}
        required
        aria-invalid={!validInput}
        aria-describedby={inputName + "-note"}
        onFocus={setInputFocus && (() => setInputFocus(true))}
        onBlur={setInputFocus && (() => setInputFocus(false))}
      />
    </>
  );
};

export default DefaultInputField;
