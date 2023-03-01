import { useState } from "react";
import formJSON from "../../../data/form.json";

const FillForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(formJSON[0]);
  const [endPoint, setEndPoint] = useState("");
  const [lastQuestion] = useState([]);

  const handleAnswerQuestion = (option) => {
    lastQuestion.push(currentQuestion);
    if (option.next === "") {
      setEndPoint(option.end);
      setCurrentQuestion(null);
    } else {
      setEndPoint("");
      setCurrentQuestion(formJSON.find((question) => question.id === option.next));
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(lastQuestion.pop());
    setEndPoint("");
  };

  return (
    <section>
      <h1>Bienvenue dans le formulaire !</h1>
      <br />
      <h3>{currentQuestion?.title}</h3>
      <br />
      {currentQuestion?.options.map((option) => (
        <button key={option.id} onClick={() => handleAnswerQuestion(option)}>
          {option.title}
        </button>
      ))}
      {endPoint && <h3>{endPoint}</h3>}
      {lastQuestion.length !== 0 && (
        <button onClick={() => handlePreviousQuestion()}>Question précédente</button>
      )}
    </section>
  );
};

export default FillForm;
