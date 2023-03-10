import { useState } from "react";
import { Timeline, Text } from "@mantine/core";
import formJSON from "../../../data/form.json";

const FillForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(formJSON[0]);
  const [endPoint, setEndPoint] = useState("");
  const [answeredQuestions] = useState([]);
  const [answeredOptions] = useState([]);

  const handleAnswerQuestion = (option) => {
    answeredQuestions.push(currentQuestion);
    answeredOptions.push(option);
    if (option.next === "") {
      setEndPoint(option.end);
      setCurrentQuestion(null);
    } else {
      setEndPoint("");
      setCurrentQuestion(formJSON.find((question) => question.id === option.next));
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(answeredQuestions.pop());
    answeredOptions.pop();
    setEndPoint("");
  };

  const handleResetForm = () => {
    setCurrentQuestion(formJSON[0]);
    setEndPoint("");
    answeredQuestions.length = 0;
    answeredOptions.length = 0;
  };

  return (
    <section>
      {endPoint === "" ? <h1>Bienvenue dans le formulaire !</h1> : <h1>Solution proposée</h1>}
      <br />
      <h3>{currentQuestion?.title}</h3>
      <br />
      {currentQuestion?.options.map((option) => (
        <button key={option.id} onClick={() => handleAnswerQuestion(option)}>
          {option.title}
        </button>
      ))}

      {endPoint && (
        <>
          <h2>{endPoint}</h2>
          <br />
          <Timeline color="indigo" active={answeredQuestions.length}>
            {answeredQuestions.map((question) => (
              <Timeline.Item key={question.id} title={question.title}>
                <Text color="dimmed" size="sm">
                  Réponse : {answeredOptions[answeredQuestions.indexOf(question)].title}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </>
      )}

      {answeredQuestions.length !== 0 && (
        <button onClick={() => handlePreviousQuestion()}>Question précédente</button>
      )}
      {endPoint && <button onClick={() => handleResetForm()}>Recommencer le formulaire</button>}
    </section>
  );
};

export default FillForm;
