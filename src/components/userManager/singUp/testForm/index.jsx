import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//import ReactFlipCard from "reactjs-flip-card";
import Button from "@mui/material/Button";
import Card from "./card";
import "./testForm.css";
//import ApiAgents from "./apiAgents";
import { CSSTransition } from "react-transition-group";

export default function TestForm({ name = "Test", info, agents, setValues }) {
  const [cardFront, setCardFront] = useState(true);
  const [cardBack, setCardBack] = useState(false);
  const [accept, setAccept] = useState(false);
  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);


  const handleFinishTest = (testValues, isSkip) => {
    setValues(testValues, isSkip);
  };

  const handleFlip = () => {
    if (cardFront) {
      setCardFront(false);
      setTimeout(() => {
        setCardBack(true);
      }, 500);
    } else {
      setCardBack(false);
      setTimeout(() => {
        setCardFront(true);
      }, 500);
    }
  };
  /*
  if (accept) {
    return (
      <ApiAgents
        handleFinishTest={handleFinishTest}
        agents={agents}
        info={info}
      />
    );
  }
*/
  const front = (
    <div>
      <div>
        <Typography gutterBottom variant="h6" component="div">
          {info.name}
        </Typography>
      </div>
      <div
        style={{
          margin: 1,
          padding: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "auto",
          height: "400px",
          background: "#ffffff",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {info.objective}
        </Typography>
        <Typography variant="body1">{info.description}</Typography>
      </div>
      <div
        style={{
          margin: 1,
          padding: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "auto",
          background: "#9ADBF9",
        }}
      >
        <Button variant="contained" color="success" onClick={handleFlip}>
          Continuar
        </Button>
      </div>
    </div>
  );

  const back = (
    <div>
      <div
        style={{
          margin: 1,
          padding: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "auto",
          height: "400px",
          background: "#ffffff",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {info.objective}
        </Typography>
        <Typography variant="body1">Requisitos:</Typography>
        <Typography variant="body2">{info.requirement.comment}</Typography>
        <Typography variant="body1">
          {`Tiempo aproximado: ${info.requirement.timeMin}min - ${info.requirement.timeMax}min`}
        </Typography>
      </div>
      <div
        style={{
          margin: 1,
          padding: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "auto",
          background: "#9ADBF9",
        }}
      >
        <div style={{ display: "flex" }}>
          <Button variant="contained" color="secondary" onClick={handleFlip}>
            {"<="}
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setAccept(true);
            }}
          >
            Continuar
          </Button>
        </div>
        <Button
          style={{ marginTop: "5px" }}
          variant="contained"
          size="small"
          color="warning"
          onClick={() => {
            handleFinishTest({}, true);
          }}
          sx={{
            fontSize: 11,
          }}
        >
          Saltar por ahora
        </Button>
      </div>
    </div>
  );

  return (
    <Box
      id="testInit"
      sx={{
        marginTop: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        {name}
      </Typography>
      <div>
        <div style={{ width: "350px", height: "560px" }}>
          <CSSTransition
            in={cardFront}
            nodeRef={nodeRef}
            timeout={500}
            classNames="flip"
            unmountOnExit
          >
            <div ref={nodeRef} className="testCard">
              <Card content={front} />
            </div>
          </CSSTransition>
          <CSSTransition
            in={cardBack}
            nodeRef={nodeRef2}
            timeout={500}
            classNames="flip"
            unmountOnExit
          >
            <div ref={nodeRef2} className="testCard">
              <Card content={back} />
            </div>
          </CSSTransition>
        </div>
      </div>
    </Box>
  );
}

