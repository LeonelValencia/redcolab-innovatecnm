import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import TOPICS from "../../components/userManager/singUp/interest/topics.json"
import {INTEREST_SCHEMA} from "../../components/webServices/interest"
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useInsertInterests } from "../../components/webServices/interest";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Interests() {
  const [formData, setFormData] = useState({...INTEREST_SCHEMA});
  const [snackType, setSnackType] = useState({ open: false });
  const [insertNewInterest,{loading}] = useInsertInterests()
  const showSnackbar = (severity, message) => {
    setSnackType({ severity: severity, message: message, open: true });
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
    if(formData.area.length < 1){
      showSnackbar("error", "Parece que falta el area");
      return null
    }
    if(formData.concept.length < 1){
      showSnackbar("error", "Parece que falta el concepto");
      return null
    }
    e.preventDefault();
    showSnackbar("success", "Interés Agregado");
    insertNewInterest({
      interest: formData,
      onCompleted: ()=>{
        setFormData({...INTEREST_SCHEMA})
      },
      onError: (error)=>{
        console.error("mutation error", error);
        showSnackbar("error", "Error al intentar insertar");
      }
    })
    // Aquí puedes realizar acciones con los datos del formulario, como enviarlos a un servidor.
    console.log(formData);
  };

  return (
    <Box mt={2}>
        <FormControl fullWidth>
          <InputLabel htmlFor="area">Area:</InputLabel>
          <Select
            name="area"
            id="area"
            value={formData.area}
            onChange={handleInputChange}
          >
            <MenuItem value="">Selecciona un área</MenuItem>
            {Object.keys(TOPICS).map((key)=>(
              <MenuItem key={key} value={key}>{TOPICS[key].label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Concepto"
          name="concept"
          id="concept"
          value={formData.concept}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          label="Descripción"
          name="description"
          id="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
        />
        <LoadingButton loading={loading} onClick={handleSubmit}  variant="contained" color="primary" mt={2}>
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
