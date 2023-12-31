import React, { useState, useRef, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DataVerifier from "../../../../components/webServices/tools";
import Box from "@mui/material/Box";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Area de habilidades sociales",
        data: data.map((item) => item.value),
        backgroundColor: "#F5AD96aa",
        borderColor: "#F595B6",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    pointRadius: 15,
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 10,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div>
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default function Moss({ user }) {
  const [open, setOpen] = useState(false);
  const handleDrawer = () => {
    setOpen(!open);
  };
  if (!DataVerifier.isValidArray(user.skills.soft)) {
    return null;
  }
  const soft = user.skills.soft;
  const data = [];
  soft.forEach(skill => {
    data.push({label: skill.name, value: skill.score})
  });
  
  return (
    <Grid item key={"card01"} xs={12}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography gutterBottom variant="h5" component="h2">
            Adaptabilidad Social
          </Typography>
          <Typography>
            Para el desarrollo colaborativo es importante que la conozcas pues
            te permite saber tus capacidades de participación, supervisión,
            evaluación y resolución de problemas interpersonales, con la
            finalidad de que mejores tu desempeño al trabajar en equipo. Las
            limitaciones son; no aporta suficientes datos en relación a la
            personalidad, mide mas aspectos de sociabilidad que aspectos de la
            personalidad.
          </Typography>
          <div>
            <BarChart data={data} />
          </div>
        </CardContent>
        <CardActions>
          <Button onClick={handleDrawer} color="success">
            Saber mas
          </Button>
          {/*
                    <Drawer anchor={"bottom"} sx={{height: "50%"}} open={open} onClose={handleDrawer}>
            <Summary trendInterest={user.skills.trendInterest} />
          </Drawer>
          */}
        </CardActions>
      </Card>
    </Grid>
  );
}

function Summary({ trendInterest }) {
  return (
    <Box sx={{ width: "100%", m: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        El conocimiento es un concepto fundamental que juega un papel crucial en
        diversos campos, incluyendo la ciencia, la tecnología, la naturaleza y
        las ciencias sociales.
      </Typography>
      <br />
      <Typography variant="body1">
        Ciencia Formales o Fácticas: se enfoca en el estudio de sistemas
        abstractos, estructuras lógicas y relaciones formales. A diferencia de
        las ciencias naturales o las ciencias sociales, que se centran en la
        observación y el estudio de fenómenos del mundo real, las ciencias
        formales se ocupan de conceptos y entidades abstractas y se basan en la
        lógica y las matemáticas para desarrollar sus teorías y sistemas de
        conocimiento.
      </Typography>
      <br />
      <Typography variant="body1">
        Naturaleza: El conocimiento sobre la naturaleza se refiere a la
        comprensión de los sistemas naturales, los ecosistemas, la biodiversidad
        y los procesos geológicos y climáticos que ocurren en el planeta. Este
        conocimiento es esencial para la conservación del medio ambiente y la
        gestión sostenible de los recursos naturales. La ciencia, en particular
        la ecología, la biología y la geología, desempeña un papel fundamental
        en la adquisición de este conocimiento.
      </Typography>
      <br />
      <Typography variant="body1">
        Ciencias Sociales: En las ciencias sociales, el conocimiento se centra
        en la comprensión de la sociedad, la cultura, el comportamiento humano,
        las instituciones y las interacciones sociales. Las disciplinas como la
        sociología, la psicología, la economía y la antropología buscan
        analizar, interpretar y explicar los fenómenos sociales a través de la
        investigación y la teoría. El conocimiento en las ciencias sociales es
        esencial para abordar cuestiones como la política, la educación, la
        economía y la justicia social.
      </Typography>
    </Box>
  );
}
