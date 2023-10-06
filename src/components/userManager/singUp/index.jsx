import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import md5 from "md5";
import {
  useNewUserService,
  userSchema,
  useValidateEmail,
} from "../../webServices/user";
import DataVerifier from "../../webServices/tools";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {`"Tecnología para la colaboración"`}
      <br />
      {`Redcolab Copyright ©`}
      {new Date().getFullYear()}
      <br />
    </Typography>
  );
}

export default function SignUp() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  //const [fakePass, setFakePass] = useState("");
  const [password, setPassword] = useState("");
  //const [fakePass2, setFakePass2] = useState("");
  const [password2, setPassword2] = useState("");
  const [snackType, setSnackType] = useState({ open: false });
  const [inputsInvalid, setInputsInvalid] = useState({});
  const [validateEmail, { loading: validateLoad }] = useValidateEmail();
  const [insertNewUser, { loading: insertLoad }] = useNewUserService();
  const navigate = useNavigate()

  const validMail = email.length > 0 ? /\S+@\S+\.\S+/.test(email) : true;

  const showSnackbar = (severity, message) => {
    setSnackType({ severity: severity, message: message, open: true });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackType({ open: false });
  };

  async function handleSummit(e) {
    e.preventDefault();
    if (password !== password2) {
      showSnackbar("error", "Las contraseñas no son iguales");
      setInputsInvalid({
        password: true,
      });
      return null;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      showSnackbar("error", "Email no es correcto. ✉️✉️✉️");
      setInputsInvalid({
        name: name === "",
        lastName: lastName === "",
        password: password === "",
        email: email === "",
      });
      return null;
    }
    const pass = md5(password);
    try {
      validateEmail({
        email: email,
        onCompleted: (data = {}) => {
          if (data.hasOwnProperty("user")) {
            if (!DataVerifier.isValidArray(data.user)) {
              console.log("se inserta");
              let newUser = { ...userSchema };
              newUser.contact.email = email;
              newUser.personal.name = name;
              newUser.personal.lastName = lastName;
              newUser.password = pass;
              try {
                insertNewUser({
                  user: newUser,
                  onCompleted: (data) => {
                    console.log(data);
                    showSnackbar(
                      "success",
                      "Usuario Registrado con éxito. 🥳🥳🥳"
                    );
                    setName("");
                    setLastName("");
                    setEmail("");
                    setPassword("");
                    setPassword2("");
                    navigate("/testNewUser/")
                  },
                  onError: (error) => {
                    console.error("insert new user query error: ", error);
                    showSnackbar(
                      "error",
                      "Tenemos un problema interno. 💥💥💥"
                    );
                  },
                });
              } catch (error) {
                console.error("mutation error: ", error);
                    showSnackbar(
                      "error",
                      "Tenemos un problema interno. 💥💥💥"
                    );
              }
              setInputsInvalid({});
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
  }

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
                  value={name}
                  onChange={(event) => {
                    setInputsInvalid({
                      ...inputsInvalid,
                      name: false,
                    });
                    setName(event.target.value);
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
                  value={lastName}
                  error={inputsInvalid?.lastName}
                  onChange={(event) => {
                    setInputsInvalid({
                      ...inputsInvalid,
                      lastName: false,
                    });
                    setLastName(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
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
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  Al crear una cuenta estas aceptando nuestros{" "}
                  <Link>Términos y Condiciones</Link>
                </Typography>
              </Grid>
            </Grid>
            <LoadingButton
              loading={validateLoad || insertLoad}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSummit}
            >
              Continuar
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  ¿Ya tienes cuenta? Inicia Sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
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
function makeFakePass(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


const API = process.env.REACT_APP_SERVICE_USER + "/signup";
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          lastName,
          email,
          password: pass,
        }),
      });
      if (response.ok) {
        showSnackbar("success", "Usuario Registrado con éxito. 🥳🥳🥳");
        setName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setPassword2("");

        setInputsInvalid({});
      } else {
        const data = await response.json();
        console.log("response error:", data);
        showSnackbar("error", "Error: " + data.body.error + " 😥😥");
        switch (data.body.input) {
          case "email":
            setInputsInvalid({
              email: true,
            });
            break;
          default:
            setInputsInvalid({
              name: name === "",
              lastName: lastName === "",
              password: password === "",
              email: email === "",
            });
            break;
        }
      }
    } catch (error) {
      console.error("summitError: ", error);
      showSnackbar("error", "Tenemos un problema interno. 💥💥💥");
    }
*/
