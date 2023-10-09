import React, { useState } from "react";
import DatePickerValue from "../../utils/DatePickerValue";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
//import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
//import md5 from "md5";
import { academicSchema } from "../../webServices/user";
import DataVerifier from "../../webServices/tools";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Academic() {
  const [isStudent, setisStudent] = useState(false);
  const [endDate, setEndDate] = useState(false);

  const [form, setForm] = useState({ ...academicSchema });
  const [inputsInvalid, setInputsInvalid] = useState({});
  console.log(form);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Datos Académicos
        </Typography>
        <Typography component="h2" variant="h5">
          Registra tu escuela o tu ultimo grado de estudios
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <InputLabel id="demo-simple-select-label">
              Nivel de Estudio
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              fullWidth
              id="demo-simple-select"
              value={form.degree.key}
              label="Nivel de Estudio"
              onChange={(event) => {
                setInputsInvalid({
                  ...inputsInvalid,
                  degreeNAme: false,
                });
                const { name, description } = degrees[event.target.value];
                setForm({
                  ...form,
                  degree: {
                    key: event.target.value,
                    name: name,
                    description: description,
                  },
                });
              }}
            >
              {Object.keys(degrees).map((key) => (
                <MenuItem key={key} value={key}>
                  {degrees[key].name}
                </MenuItem>
              ))}
            </Select>
            <Typography component="p" variant="body2">
              {form.degree.description}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Fecha de Inicio</InputLabel>
            <DatePickerValue
              label="Inicio"
              setTime={(value) => {
                setForm({...form, dateStart: value.$d})
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {endDate ? (
              <>
                <InputLabel>Fecha de Finalización</InputLabel>
                <DatePickerValue
                  label="Fin"
                  setTime={(value) => {
                    setForm({...form, dateStart: value.$d})
                  }}
                />
                <Button
                  onClick={() => {
                    setEndDate(false);
                  }}
                >
                  Aun no he terminado
                </Button>
              </>
            ) : (
              <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '100%'
              }}
              >
                <Button
                onClick={() => {
                  setEndDate(true);
                }}
              >
                Ya he finalizado
              </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

const degrees = {
  básica: {
    name: "Básica",
    description:
      "Está compuesta por los niveles Preescolar, Primaria y Secundaria.",
  },
  medioSuperior: {
    name: "Medio Superior",
    description:
      "Comprende el nivel de bachillerato, así como los demás niveles equivalentes a éste, y la educación profesional que no requiere bachillerato o sus equivalentes.",
  },
  superior: {
    name: "Superior",
    description:
      "Está compuesto por la licenciatura, la especialidad, la maestría y el doctorado, así como por opciones terminales previas a la conclusión de la licenciatura, como los estudios de Técnico Superior Universitario",
  },
  especial: {
    name: "Educación Especial, Inclusiva o de Adultos",
    description:
      "Comprende los estudios dirigidos a personas con capacidades diferentes y a quienes abandonaron o no tuvieron la oportunidad de una educación formal",
  },
};
