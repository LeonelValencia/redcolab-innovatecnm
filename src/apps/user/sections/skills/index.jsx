import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TrendInterest from "./trendInterest";
import Moss from "./moss";


export default function Skills({ user }) {
    
  return (
    <div>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Conócete
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Entérate de tu nivel de colaboración e impacto en nuestra red,
            explora los diferentes test de Psicométrica que te ayudaran a
            descubrirte. Recuerda interactúa con las diferentes funcionalidades
            de la aplicación
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={2}>
          <TrendInterest user={user} />
          <Moss  user={user} />
          <Grid item key={"card02a"} xs={12} >
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Habilidades Colaborativas
                </Typography>
                <Typography>
                  Aun no has interactuado lo suficiente en la plataforma :(
                </Typography>
                <Typography>
                  Recuerda interactúa con las diferentes funcionalidades la
                  aplicación
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="success">
                  ¿Como mejorar?
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item key={"card03"} xs={12} >
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Proximate mas pruebas
                </Typography>
                <Typography>
                    n.n
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="success">
                  leer mas
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
