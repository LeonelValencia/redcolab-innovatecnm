import React, {useId, useState } from "react";
import DataVerifier from "../../../webServices/tools";
import Card from "./card";
import ReactFlipCard from "reactjs-flip-card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function getValues(skills = []) {
  let _values = {};
  if (DataVerifier.isValidArray(skills)) {
    skills.forEach((skill) => {
      _values[skill.code] = skill.score.min;
    });
  }
  return _values;
}

function getQuestions(agents, values = {}) {
  let questions = [];
  if (DataVerifier.isValidObject(agents)) {
    Object.keys(agents).forEach((key) => {
      if (values.hasOwnProperty(key)) {
        let agent = { ...agents[key] };
        if (DataVerifier.isValidArray(agent.questions)) {
          agent.questions.forEach((question) => {
            questions.push({
              code: key,
              ...question,
            });
          });
        }
      } else {
        console.warn("property, agent code no found" + key);
      }
    });
  }
  return questions;
}

export default function ApiAgents({ handleFinishTest, agents, info }) {
  const [init, setInt] = useState(false);
  const testID = useId();

  const handleFinish = (value) => {
    const elem = document.getElementById(testID);
    if (elem) {
      document.exitFullscreen();
      setTimeout(() => {
        handleFinishTest(value);
      }, 500);
    }
  };

  return (
    <div
      id={testID}
      style={{
        color: "#ffffff",
        backgroundColor: "black",
        width: "100%",
        height: "100vh",
        position: "absolute",
        top: 0,
        zIndex: 1001,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>Aplicación Test</p>
      {init ? (
        <ShowQuestion agents={agents} handleFinish={handleFinish} info={info} />
      ) : (
        <Button
          color="success"
          variant="contained"
          onClick={() => {
            const elm = document.getElementById(testID);
            if (elm) {
              elm.requestFullscreen();
            }
            setInt(true);
          }}
        >
          Continuar
        </Button>
      )}
    </div>
  );
}

function ShowQuestion({ agents, handleFinish, info }) {
  const [values, setValues] = useState(getValues(info.skills));
  const pastelColors = [
    "#FF99CC",
    "#FF99FF",
    "#CC99FF",
    "#9999FF",
    "#99CCFF",
    "#99FFFF",
    "#99FFCC",
    "#99FF99",
    "#CCFF99",
    "#FFFF99",
    "#FFCC99",
  ];
  const [time] = useState(new Date());
  const [COLOR, setColor] = useState(
    pastelColors[Math.floor(Math.random() * pastelColors.length)]
  );
  const [flip, setFlip] = useState(false);
  const [questions, setQuestions] = useState(getQuestions(agents, values));
  const [index, setIndex] = useState(
    Math.floor(Math.random() * questions.length)
  );

  const handleAnswer = (_id) => {
    const code = question.code;

    if (_id === question.match) {
      let result = {};
      result[code] = values[code] + question.score;
      setValues({ ...values, ...result });
    }
    let newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
    setIndex(Math.floor(Math.random() * newQuestions.length));
    setColor(pastelColors[Math.floor(Math.random() * pastelColors.length)]);
    setFlip(!flip);
  };

  if (!DataVerifier.isValidArray(questions)) {
    const finishTime = new Date();
    let minutos = (finishTime - time) / 1000 / 60;
    return (
      <div>
        <p>
          <b>TEST TERMINADO</b>
        </p>
        <p>{minutos}min</p>
        <Button
          color="success"
          variant="contained"
          onClick={() => {
            handleFinish(values);
          }}
        >
          Continuar
        </Button>
      </div>
    );
  }
  const question = questions[index];

  const QuestionCard = (
    <div
      style={{
        height: " 460px",
        backgroundColor: " azure",
        margin: " 30px 0 30px 0",
        overflow: " auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <Typography gutterBottom variant="h5" component="div">
        {question.question}
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          setFlip(!flip);
        }}
      >
        Continuar
      </Button>
    </div>
  );

  const AnswerCard = (
    <div>
      <Button
        size="small"
        variant="contained"
        onClick={() => {
          setFlip(!flip);
        }}
      >
        Regresar
      </Button>
      <p style={{ fontSize: "10px" }}>{question.question}</p>

      <div
        style={{
          height: " 410px",
          backgroundColor: " azure",
          margin: " 10px 0 30px 0",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          padding: "10px",
        }}
      >
        {question.answers.map((item) => (
          <Button
            key={item._id}
            size="small"
            variant="contained"
            onClick={() => {
              handleAnswer(item._id);
            }}
          >
            {item.answer}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {flip ? (
        <p>
          <b>Seleccione una respuesta</b>
        </p>
      ) : (
        <p>
          <b>Lea con cuidado</b>
        </p>
      )}

      <div style={{ width: "350px", height: "560px" }}>
        <ReactFlipCard
          flipByProp={flip}
          flipTrigger={"disabled"}
          frontComponent={<Card color={COLOR} content={QuestionCard} />}
          backComponent={<Card color={COLOR} content={AnswerCard} />}
        />
      </div>
    </>
  );
}
