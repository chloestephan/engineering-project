const SuccessMessageForm = ({ successMsg, successRef }) => {
  return (
    <p ref={successRef} className={successMsg ? "successmsg" : "offscreen"} aria-live="assertive">
      {successMsg}
    </p>
  );
};

export default SuccessMessageForm;
