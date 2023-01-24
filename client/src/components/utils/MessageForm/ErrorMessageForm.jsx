const ErrorMessageForm = ({ errMsg, errRef }) => {
  return (
    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
      {errMsg}
    </p>
  );
};

export default ErrorMessageForm;
