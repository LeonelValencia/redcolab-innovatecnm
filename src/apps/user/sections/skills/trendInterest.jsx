import React, { useState, useRef, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DataVerifier from "../../../../components/webServices/tools";
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



const BarChart = ({ data }) => {
    const chartData = {
      labels: data.map(item => item.label),
      datasets: [
        {
          label: "Tendencia de interés",
          data: data.map(item => item.value),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    const options = {
        tension: 1,
        pointRadius: 15,
        scales: {
            r: {
                angleLines: {
                    display: false
                },
                suggestedMin: 10,
                suggestedMax: 100
            }
        }
    }
  
    return (
      <div>
         <Radar data={chartData} options={options} />
      </div>
    );
  };

export default function TrendInterest({ user }) {
  const [open, setOpen] = useState(false);
  const handleDrawer = () => {
    setOpen(!open);
  };
  if(!DataVerifier.isValidArray(user.skills.trendInterest)){
    return null
  }
  const trendInterest = user.skills.trendInterest[0]
  const data = [
    { label: "Fácticas", value: trendInterest.formal*100/250 },
    { label: "Naturaleza", value: trendInterest.nature*100/250 },
    { label: "Sociales", value: trendInterest.social*100/250 },
  ];
  return (
    <Grid item key={"card01"} xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            Tendencia de Interés
          </Typography>
          <div>
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
          <Button onClick={handleDrawer} color="success" >¿Como mejorar?</Button>
          <Drawer anchor={"bottom"} open={open} onClose={handleDrawer}>
            <Summary trendInterest={user.skills.trendInterest} />
          </Drawer>
        </CardActions>
      </Card>
    </Grid>
  );
}

function Summary({ trendInterest }) {
  
  return (
    <div>
        Hola
      {/*<BarChart data={data}/>
      */}
    </div>
  );
}
