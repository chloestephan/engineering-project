import { useState } from "react";
import { Timeline, Text } from "@mantine/core";
import EndpointRedaction from "../../utils/EndpointRedaction/EndpointRedaction";
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
    <body>
      <div class="formulaire">
        {endPoint === "" ? <h1>Merci de répondre aux questions suivantes</h1> : <h1>Solution proposée</h1>}
        <hr></hr>
        <p>{currentQuestion?.title}</p>
        {currentQuestion?.options.map((option) => (
          <button key={option.id} onClick={() => handleAnswerQuestion(option)}>
            {option.title}
          </button>
        ))}

        {endPoint && (
          <div>
            <EndpointRedaction endpointTitle={endPoint} />
            <Timeline class="timeline" active={answeredQuestions.length}>
              {answeredQuestions.map((question) => (
                <Timeline.Item key={question.id} title={question.title}>
                  <Text color="dimmed" size="sm">
                    Réponse : {answeredOptions[answeredQuestions.indexOf(question)].title}
                  </Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        )}

        {answeredQuestions.length !== 0 && (
          <button onClick={() => handlePreviousQuestion()}>Question précédente</button>
        )}
        {endPoint && <button onClick={() => handleResetForm()}>Recommencer le formulaire</button>}
    </div>
    </body>
  );
};

export default FillForm;
