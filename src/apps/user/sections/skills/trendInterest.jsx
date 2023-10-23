import React, { useState, useRef, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from "chart.js";
  import {Radar} from "react-chartjs-2";
  
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  export const data = {
    options: {
      plugins: {
        title: {
            display: false,
            text: 'Custom Chart Title'
        }
    },
      scales: {
        r: {
          pointLabels: {
            color: "white",
            font: {
              size: 14,
            },
          },
          angleLines: {
            color: "white",
          },
          ticks: {
            // display:false,
            color: "#000",
            stepSize: 1,
          },
          grid: {
            color: "#fff",
            lineWidth: 2,            
  
          },
          beginAtZero: true,
        },
      },
    },
  };

const BarChart = ({ data }) => {
    const chartData = {
      labels: data.map(item => item.label),
      datasets: [
        {
          label: "Ventas por mes",
          data: data.map(item => item.value),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  
    return (
      <div>
         <Radar data={skills} options={data.options} />;
      </div>
    );
  };

export default function TrendInterest({ user }) {
  const [open, setOpen] = useState(false);
  const handleDrawer = () => {
    setOpen(!open);
  };
  const data = [
    { label: "Formal", value: 10 },
    { label: "Naturaleza", value: 15 },
    { label: "Sociales", value: 30 },
    // ... otros meses
  ];
  return (
    <Grid item key={"card01"} xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            Tendencia de Interés
          </Typography>
          <div>
      <h1>Mi Gráfico de Barras</h1>
      <BarChart data={data}/>
    </div>
          <Typography>
            El conocimiento es la base de la ciencia, la tecnología, la
            comprensión de la naturaleza y el estudio de las interacciones
            humanas en las ciencias sociales.
          </Typography>
          <Typography>
            El entender que intereses te llaman la atención te ayudara tomar
            mejores decisiones en cuanto a que aprender o en donde colaborar
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleDrawer}>Ver Resumen</Button>
          <Drawer anchor={"bottom"} open={open} onClose={handleDrawer}>
            <Summary trendInterest={user.skills.trendInterest} />
          </Drawer>
          <Button size="small" color="success">
            ¿Como mejorar?
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

function Summary({ trendInterest }) {
  
  return (
    <div>
      <h1>Mi Gráfico de Barras</h1>
      {/*<BarChart data={data}/>
      */}
    </div>
  );
}
