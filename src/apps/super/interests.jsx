import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function Interests() {
  const [formData, setFormData] = useState({
    area: "",
    concepto: "",
    descripcion: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar acciones con los datos del formulario, como enviarlos a un servidor.
    console.log(formData);
  };

  return (
    <Box mt={2}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel htmlFor="area">Area:</InputLabel>
          <Select
            name="area"
            id="area"
            value={formData.area}
            onChange={handleInputChange}
          >
            <MenuItem value="">Selecciona un área</MenuItem>
            <MenuItem value="Ciencias Naturales">Ciencias Naturales</MenuItem>
            <MenuItem value="Cultura y Sociedad">Cultura y Sociedad</MenuItem>
            <MenuItem value="Tecnologia">Tecnologia</MenuItem>
            <MenuItem value="Salud">Salud</MenuItem>
            <MenuItem value="Ciencias Sociales">Ciencias Sociales</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Concepto"
          name="concepto"
          id="concepto"
          value={formData.concepto}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          label="Descripción"
          name="descripcion"
          id="descripcion"
          multiline
          rows={4}
          value={formData.descripcion}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="contained" color="primary" mt={2}>
          Enviar
        </Button>
      </form>
    </Box>
  );
}
