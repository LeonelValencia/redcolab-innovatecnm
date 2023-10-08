import React, { useId, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ReactFlipCard from "reactjs-flip-card";
import Button from "@mui/material/Button";
import Card from "./card";
import "./testForm.css";
import ApiAgents from "./apiAgents";

export default function TestForm({ name = "Test", info, agents, setValues }) {
  const [flip, setFlip] = useState(false);
  const [accept, setAccept] = useState(false);

  const handleFinishTest=(testValues,isSkip)=>{
    setValues(testValues,isSkip)
  }

  if(accept){
    return <ApiAgents handleFinishTest={handleFinishTest} agents={agents} info={info} />
  }

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
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setFlip(!flip);
          }}
        >
          Continuar
        </Button>
      </div>
    </div>
  );

  const back = (
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
        <Typography variant="body1">Requisitos:</Typography>
        <Typography variant="body2">{info.requirement.comment}</Typography>
        <Typography variant="body1">
          {`Tiempo aproximado: ${info.requirement.timeMin}min - ${info.requirement.timeMax}min`}
        </Typography>
      </div>
      <div style={{
          margin: 1,
          padding: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "auto",
          background: "#9ADBF9",
        }}>
      <div style={{display: 'flex'}} >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setFlip(!flip);
          }}
        >
          {"<="}
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setAccept(true)
          }}
        >
          Continuar
        </Button>
      </div>
      <Button
      style={{marginTop: "5px"}}
          variant="contained"
          size="small"
          color="warning"
          onClick={() => {
            handleFinishTest({},true)
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
      <div style={{ width: "350px", height: "560px" }}>
        <ReactFlipCard
          flipByProp={flip}
          flipTrigger={"disabled"}
          frontComponent={<Card content={front} />}
          backComponent={<Card content={back} />}
        />
      </div>
    </Box>
  );
}
