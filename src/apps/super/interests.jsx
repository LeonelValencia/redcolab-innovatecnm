import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import TOPICS from "../../components/userManager/singUp/interest/topics.json";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Sliders } from "./sliders";

import {
  useInsertInterests,
  INTEREST_SCHEMA,
  VECTOR_SCHEMA,
} from "../../components/webServices/interest";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Interests() {
  const [formData, setFormData] = useState({ ...INTEREST_SCHEMA });
  const [vector, setVector] = useState({ ...VECTOR_SCHEMA });
  const [keywords, setKeywords] = useState("");
  const [snackType, setSnackType] = useState({ open: false });
  const [insertNewInterest, { loading }] = useInsertInterests();
  const showSnackbar = (severity, message) => {
    setSnackType({ severity: severity, message: message, open: true });
  };

  const setColor = () => {
    const r =
      vector.social.toString(16).length < 2
        ? "0" + vector.social.toString(16)
        : vector.social.toString(16);
    const b =
      vector.formal.toString(16).length < 2
        ? "0" + vector.formal.toString(16)
        : vector.formal.toString(16);
    const g =
      vector.nature.toString(16).length < 2
        ? "0" + vector.nature.toString(16)
        : vector.nature.toString(16);
    return `#${r}${g}${b}`;
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackType({ open: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.area.length < 1) {
      showSnackbar("error", "Parece que falta el area");
      return null;
    }
    if (formData.concept.length < 1) {
      showSnackbar("error", "Parece que falta el concepto");
      return null;
    }
    const patron = /^([^,]+, )+[^,]+$/;
    let _keywords = []
    if (!patron.test(keywords)) {
      showSnackbar(
        "error",
        "Parece que las palabras clave no están separadas por coma"
      );
      return null;
    }else{
      _keywords = keywords.split(",")
    }

    insertNewInterest({
      interest: {...formData,keywords: _keywords, color: setColor(), vector: vector},
      onCompleted: () => {
        showSnackbar("success", "Interés Agregado");
        setFormData({ ...INTEREST_SCHEMA });
        setVector({...VECTOR_SCHEMA})
        setKeywords("")
      },
      onError: (error) => {
        console.error("mutation error", error);
        showSnackbar("error", "Error al intentar insertar");
      },
    });
  };

  return (
    <Box mt={2} sx={{ border: `5px solid ${setColor()}`  }}>
      <TextField
        fullWidth
        label="Concepto"
        name="concept"
        id="concept"
        value={formData.concept}
        onChange={handleInputChange}
      />
      <Typography id="input-slider" gutterBottom>
              Metadata control
            </Typography>
      <FormControl fullWidth>
        <InputLabel htmlFor="area">Area:</InputLabel>
        <Select
          name="area"
          id="area"
          value={formData.area}
          onChange={(e) => {
            handleInputChange(e);
            if (e.target.value !== "") {
              const key = TOPICS[e.target.value].key;
              const comp = {};
              comp[key] = 200;
              setVector({
                ...VECTOR_SCHEMA,
                ...comp,
              });
            }else{
              setVector({
                ...VECTOR_SCHEMA
              });
            }
          }}
        >
          <MenuItem value="">Selecciona un área</MenuItem>
          {Object.keys(TOPICS).map((key) => (
            <MenuItem key={key} value={key}>
              {TOPICS[key].label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {Object.keys(TOPICS).map((key) => {
        const Slider = Sliders[TOPICS[key].key];
        return (
          <Box key={"slider_" + key}>
            <Typography id="input-slider" gutterBottom>
              {TOPICS[key].label}
            </Typography>
            <Slider
              aria-label={"tensor" + key}
              defaultValue={0}
              valueLabelDisplay="auto"
              step={10}
              min={0}
              max={255}
              value={vector[TOPICS[key].key]}
              onChange={(e) => {
                let component = {};
                component[TOPICS[key].key] = e.target.value;
                setVector({
                  ...vector,
                  ...component,
                });
              }}
            />
          </Box>
        );
      })}
      <TextField
        fullWidth
        label="Palabras clave"
        name="keywords"
        id="keywords"
        multiline
        rows={4}
        value={keywords}
        onChange={(e) => {
          setKeywords(e.target.value);
        }}
      />
      <LoadingButton
        loading={loading}
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        mt={2}
      >
        Enviar
      </LoadingButton>
      {snackType.open && (
        <Snackbar
          open={snackType.open}
          autoHideDuration={1000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={snackType.severity}
            sx={{ width: "100%" }}
          >
            {snackType.message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}
