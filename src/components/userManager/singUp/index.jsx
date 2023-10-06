import React, { useReducer, useState } from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { userSchema } from "../../webServices/user";
import Typography from "@mui/material/Typography";
import UserInfo from "./userInfo";

const initForm = { ...userSchema };


const reducer = (state, action) => {
  switch (action.type) {
    case "setUserData":
      return { ...state, contact: action.contact, personal: action.personal };
    case "setInterest":
      return { ...state, interest: action.interest };
    case "setSoftSkills":
      return { ...state, skills: { ...state.skills, soft: action.soft } };
    case "setCollaborationSkills":
      return {
        ...state,
        skills: { ...state.skills, collaboration: action.collaboration },
      };
    case "setTechnicalSkills":
      return {
        ...state,
        skills: { ...state.skills, technical: action.technical },
      };
    default:
      return state;
  }
};

export default function SingUp() {
  const theme = useTheme();
  const [formState, dispatch] = useReducer(reducer, initForm);
  const [activeStep, setActiveStep] = useState(0);
  const [enableStep, setEnableStep] = useState(false);

  const steps = [
    <UserInfo formState={formState} dispatch={dispatch} setEnableStep={setEnableStep} />,
    "Create an ad group",
    "Create an ad",
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      {steps[activeStep]}
      <Copyright sx={{ mt: 5 }} />
      <MobileStepper
        steps={5}
        position="bottom"
        activeStep={activeStep}
        sx={{ width: "100%", flexGrow: 1 }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={!enableStep}>
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
}

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

/*
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
                      navigate("/testNewUser/");
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
                  showSnackbar("error", "Tenemos un problema interno. 💥💥💥");
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
*/

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
