const SuccessMessageForm = ({ title, link, linkTitle }) => {
  return (
    <section>
      <h1>{title}</h1>
      <p>
        <a href={link}>{linkTitle}</a>
      </p>
    </section>
  );
};

export default SuccessMessageForm;
