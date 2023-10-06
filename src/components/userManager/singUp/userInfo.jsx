import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
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
import { useValidateEmail } from "../../webServices/user";
import DataVerifier from "../../webServices/tools";

export default function UserInfo({ formState, dispatch, setEnableStep }) {
  const [email, setEmail] = useState("");
  const [isValidMail, setIsValidMail] = useState(false);
  const [personal, setPersonal] = useState({ ...formState.personal });
  const [gender, setGender] = useState(false);
  //const [password, setPassword] = useState("");
  //const [password2, setPassword2] = useState("");
  const [snackType, setSnackType] = useState({ open: false });
  const [inputsInvalid, setInputsInvalid] = useState({});
  const [validateEmail, { loading }] = useValidateEmail();

  const validMail = email.length > 0 ? /\S+@\S+\.\S+/.test(email) : true;

  const showSnackbar = (severity, message) => {
    setSnackType({ severity: severity, message: message, open: true });
  };

  const handleValidateForm = (e) => {
    e.preventDefault();
    /*if (password !== password2) {
        showSnackbar("error", "Las contraseñas no son iguales");
        setInputsInvalid({
          password: true,
        });
        return null;
      }*/
    if (personal.name === "") {
      showSnackbar("error", "El nombre es obligatorio 😥😥");
      setInputsInvalid({
        name: personal.name === "",
        lastName: personal.lastName === "",
        email: email === "",
      });
      return null;
    }
    if (personal.lastName === "") {
      showSnackbar("error", "El Apellido es obligatorio 😥😥");
      setInputsInvalid({
        name: personal.name === "",
        lastName: personal.lastName === "",
        email: email === "",
      });
      return null;
    }
    if (isValidMail) {
      return null;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      showSnackbar("error", "Email no es correcto. ✉️✉️✉️");
      setInputsInvalid({
        name: personal.name === "",
        lastName: personal.lastName === "",
        email: email === "",
      });
      return null;
    }
    try {
      validateEmail({
        email: email,
        onCompleted: (data = {}) => {
          if (data.hasOwnProperty("user")) {
            if (!DataVerifier.isValidArray(data.user)) {
              showSnackbar("success", "Todo se ve Genial, Continua. 🥳🥳🥳");
              setEnableStep(true);
              setIsValidMail(true);
              dispatch({
                type: "setUserData",
                contact: { email: email },
                personal: personal
            });
            } else {
              showSnackbar("error", "El email ya esta registrado 😥😥");
              setInputsInvalid({
                email: true,
              });
            }
          } else {
            console.error("internal validation data.user");
            showSnackbar("error", "Error interno, inténtelo mas tarde 😥😥");
          }
        },
        onError: (error) => {
          console.error("validate email query error: ", error);
          showSnackbar("error", "Tenemos un problema interno. 💥💥💥");
        },
      });
    } catch (error) {}
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackType({ open: false });
  };

  return (
    <>
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
            Regístrate
          </Typography>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre(s)"
                  autoFocus
                  error={inputsInvalid?.name}
                  value={personal.name}
                  onChange={(event) => {
                    setInputsInvalid({
                      ...inputsInvalid,
                      name: false,
                    });
                    setPersonal({ ...personal, name: event.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellidos"
                  name="lastName"
                  autoComplete="family-name"
                  value={personal.lastName}
                  error={inputsInvalid?.lastName}
                  onChange={(event) => {
                    setInputsInvalid({
                      ...inputsInvalid,
                      lastName: false,
                    });
                    setPersonal({ ...personal, lastName: event.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  id="age"
                  label="Edad"
                  name="age"
                  autoComplete="family-name"
                  value={personal.age}
                  error={inputsInvalid?.age}
                  onChange={(event) => {
                    setInputsInvalid({
                      ...inputsInvalid,
                      age: false,
                    });
                    setPersonal({ ...personal, age: event.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel id="demo-simple-select-label">Genero</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  fullWidth
                  id="demo-simple-select"
                  value={personal.gender}
                  label="Genero"
                  onChange={(event) => {
                    setInputsInvalid({
                      ...inputsInvalid,
                      gender: false,
                    });
                    if (event.target.value === "Personalizado") {
                      setGender(true);
                      setPersonal({ ...personal, gender: "" });
                    } else {
                      setGender(false);
                      setPersonal({ ...personal, gender: event.target.value });
                    }
                  }}
                >
                  <MenuItem value={"Mujer"}>Mujer</MenuItem>
                  <MenuItem value={"Hombre"}>Hombre</MenuItem>
                  <MenuItem value={"Prefiero no decirlo"}>
                    Prefiero no decirlo
                  </MenuItem>
                  <MenuItem value={"Personalizado"}>Personalizado</MenuItem>
                </Select>
              </Grid>
              {gender && (
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="personaliceGender"
                    label="¿Cual es tu Genero?"
                    name="custom-gender"
                    autoComplete="family-name"
                    value={personal.gender}
                    error={inputsInvalid?.gender}
                    onChange={(event) => {
                      setInputsInvalid({
                        ...inputsInvalid,
                        age: false,
                      });
                      setPersonal({ ...personal, gender: event.target.value });
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  disabled={isValidMail}
                  id="email"
                  label="Email"
                  error={inputsInvalid?.email || !validMail}
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setInputsInvalid({
                      ...inputsInvalid,
                      email: false,
                    });
                    setEmail(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="mobile"
                  label="Numero de Teléfono"
                  error={inputsInvalid?.mobile}
                  name="mobile"
                  autoComplete="mobile"
                  value={personal.mobile}
                  onChange={(event) => {
                    setInputsInvalid({
                      ...inputsInvalid,
                      mobile: false,
                    });
                    setPersonal({ ...personal, mobile: event.target.value });
                  }}
                />
              </Grid>
              {/*
                <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  error={inputsInvalid?.password}
                  onChange={(event) => {
                    const value = event.target.value;
                    setPassword(value);
                    setInputsInvalid({
                      ...inputsInvalid,
                      password: false,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirme Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password2}
                  error={inputsInvalid?.password}
                  onChange={(event) => {
                    const value = event.target.value;
                    setPassword2(value);
                    setInputsInvalid({
                      ...inputsInvalid,
                      password: false,
                    });
                  }}
                />
              </Grid>
                */}

              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  Valida tus datos y presiona NEXT{" "}
                  {
                    //<Link>Términos y Condiciones</Link>
                  }
                </Typography>
              </Grid>
            </Grid>
            <LoadingButton
              loading={loading}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleValidateForm}
            >
              Validar
            </LoadingButton>
          </Box>
        </Box>
      </Container>
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
    </>
  );
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/*
<Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    ¿Ya tienes cuenta? Inicia Sesión
                  </Link>
                </Grid>
              </Grid>
*/
