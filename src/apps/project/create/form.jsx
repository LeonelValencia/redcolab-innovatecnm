import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";

export default function Form() {
  const [proyecto, setProyecto] = useState({
    name: "",
    shortName: "",
    description: "",
    kayWords: "",
    goals: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProyecto({ ...proyecto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para guardar el proyecto en tu base de datos o hacer lo que sea necesario.
  };

  return (
    <Box
      sx={{
        marginTop: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        noValidate
        sx={{
          mt: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Nombre del Proyecto"
                name="name"
                value={proyecto.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Nombre Corto del Proyecto"
                name="shortName"
                value={proyecto.shortName}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Descripción del Proyecto"
                name="description"
                value={proyecto.description}
                multiline
                rows={4}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Palabras Clave"
                name="kayWords"
                multiline
                rows={4}
                value={proyecto.kayWords}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Objetivos"
                name="goals"
                value={proyecto.goals}
                onChange={handleInputChange}
                fullWidth
                multiline
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button type="submit" variant="contained" color="primary">
                Registrar Proyecto
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
