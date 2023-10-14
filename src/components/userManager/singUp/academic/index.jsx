import React, { useState } from "react";
import DatePickerValue from "../../../utils/DatePickerValue";
//import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
//import Link from "@mui/material/Link";
//import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
//import Snackbar from "@mui/material/Snackbar";
//import MuiAlert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
//import md5 from "md5";
import { academicSchema } from "../../../webServices/user";
import DataVerifier from "../../../webServices/tools";
import { DEGREES, useGetSchoolsByDegree } from "../../../webServices/academic";
import SuperiorForm from "./superiorForm";
//import SelectAcademicInfo from "./selectAcademicInfo";

/*
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
*/
export default function Academic({
  formState,
  dispatch,
  setEnableStep,
  handleNext,
}) {
  const [indexAcademic, /*setIndexAcademic*/] = useState(
    formState.academic.length === 1 ? 0 : undefined
  );
  let schema = academicSchema;
  if (DataVerifier.isValidArray(formState.academic) && indexAcademic) {
    schema = formState.academic[indexAcademic];
  }
  const [form, setForm] = useState({ ...schema });

  const [endDate, setEndDate] = useState(false);
  const [inputsInvalid, setInputsInvalid] = useState({});
  const [isOtherSchool, setIsOtherSchool] = useState(false);
  const [getSchoolsByDegree, { schools, loading }] = useGetSchoolsByDegree();

  let schoolSet;
  if (
    DataVerifier.isValidString(form.schoolId) &&
    DataVerifier.isValidArray(schools)
  ) {
    schoolSet = schools.find((s) => s._id === form.schoolId);
  }

  /*
  console.log("form", form);
  if (formState.academic.length > 1 && !indexAcademic) {
    return <SelectAcademicInfo academic={formState.academic} setIndexAcademic={setIndexAcademic} indexAcademic={indexAcademic} />;
  }
  */

  const handleSetInfo =()=>{
    dispatch({type: "setAcademic", academic: form})
    handleNext()
  }

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
            <InputLabel id="demo-simple-select-labelNivelStudio">
              Nivel de Estudio
            </InputLabel>
            <Select
              labelId="demo-simple-select-labelNivelStudio"
              disabled={loading}
              fullWidth
              id="demo-simple-select"
              value={form.degree.key}
              label="Nivel de Estudio"
              onChange={(event) => {
                setForm({
                  ...form,
                  degree: {
                    key: event.target.value,
                  },
                });
                getSchoolsByDegree({ degreeKey: event.target.value });
              }}
            >
              {Object.keys(DEGREES).map((key) => (
                <MenuItem key={key} value={key}>
                  {DEGREES[key].name}
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
                setForm({ ...form, dateStart: value.$d });
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
                    setForm({ ...form, dateStart: value.$d });
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
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Button
                  onClick={() => {
                    setEndDate(true);
                  }}
                >
                  he terminado el nivel educativo
                </Button>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            <InputLabel>Escuela</InputLabel>

            {DataVerifier.isValidArray(schools) && (
              <>
                <InputLabel id="demo-simple-select-labelSelectSchool">
                  Selecciona Escuela
                </InputLabel>
                <Select
                  labelId="demo-simple-select-labelSelectSchool"
                  fullWidth
                  id="selectSchool"
                  value={form.schoolId}
                  label="Nivel de Estudio"
                  onChange={(event) => {
                    setInputsInvalid({
                      ...inputsInvalid,
                      schoolId: false,
                    });
                    const value = event.target.value;
                    if (value === "other") {
                      setIsOtherSchool(true);
                      setForm({
                        ...form,
                        schoolId: "",
                        schoolName: "",
                      });
                    } else {
                      setIsOtherSchool(false);
                      const school = schools.find((s) => s._id === value);
                      if (school) {
                        setForm({
                          ...form,
                          schoolId: school._id,
                          schoolName: school.name,
                        });
                      }
                    }
                  }}
                >
                  {schools.map((school) => (
                    <MenuItem key={school._id} value={school._id}>
                      {school.name}
                    </MenuItem>
                  ))}
                  <MenuItem value={"other"}>Otra</MenuItem>
                </Select>
              </>
            )}
            {(isOtherSchool || !DataVerifier.isValidArray(schools)) && (
              <TextField
                required
                fullWidth
                id="personaliceSchool"
                label="Escribe el nombre de tu escuela"
                name="custom-school"
                value={form.schoolName}
                error={inputsInvalid?.schoolName}
                onChange={(event) => {
                  setInputsInvalid({
                    ...inputsInvalid,
                    schoolId: false,
                  });
                  //event.target.value
                  setForm({ ...form, schoolName: event.target.value });
                }}
              />
            )}
          </Grid>
          {form.degree.key === "superior" && (
            <>
              <Grid item xs={12} sm={9}>
                <InputLabel>
                  Numero de Control, Matricula o id de estudiante
                </InputLabel>
                <TextField
                  required
                  fullWidth
                  id="studentId"
                  label="matricula"
                  name="matricula"
                  value={form.studyStatus.studentId}
                  error={inputsInvalid?.studentId}
                  onChange={(event) => {
                    setInputsInvalid({
                      ...inputsInvalid,
                      studentId: false,
                    });
                    //event.target.value
                    setForm({
                      ...form,
                      studyStatus: {
                        ...form.studyStatus,
                        studentId: event.target.value,
                      },
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                {!endDate && (
                  <>
                    <InputLabel>semestre</InputLabel>
                    <TextField
                      required
                      fullWidth
                      id="currentSemester"
                      type="number"
                      label="semestre"
                      name="semestre"
                      value={form.studyStatus.currentSemester}
                      error={inputsInvalid?.currentSemester}
                      onChange={(event) => {
                        setInputsInvalid({
                          ...inputsInvalid,
                          currentSemester: false,
                        });
                        //event.target.value
                        setForm({
                          ...form,
                          studyStatus: {
                            ...form.studyStatus,
                            currentSemester: event.target.value,
                          },
                        });
                      }}
                    />
                  </>
                )}
              </Grid>
              {schoolSet && (
                <SuperiorForm
                  form={form}
                  setForm={setForm}
                  schoolSet={schoolSet}
                  endDate={endDate}
                />
              )}
            </>
          )}
        </Grid>
        <Box
          sx={{
            mt: 5,
          }}
        >
          <Button variant="contained" color="success"
            onClick={handleSetInfo}
          >
            Registrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
// courses
/*
const courses = [
    {
        "code": "ia",
        "name": "Ingeniería en Administración",
        "specialties":[
            {
                "code": "AN",
                "name": "Administración de Negocios"
            }
        ]
    },
    {
        "code": "ic",
        "name": "Ingeniería Civil",
        "specialties":[
            {
                "code": "EC",
                "name": "Especialidad de Civil"
            }
        ]
    },
    {
        "code": "iem",
        "name": "Ingeniería en Electromecánica",
        "specialties":[
            {
                "code": "WE",
                "name": "Diseño y simulación de sistemas electromecánicos"
            }
        ]
    },
    {
        "code": "ii",
        "name": "Ingeniería Industrial",
        "specialties":[
            {
                "code": "SEyC",
                "name": "Sistemas esbeltos y calidad"
            }
        ]
    },
    {
        "code": "isc",
        "name": "Ingeniería en Sistemas Computacionales",
        "specialties":[
            {
                "code": "DWE",
                "name": "Desarrollo Web Empresarial"
            },
            {
                "code": "CD",
                "name": "Ciencia de Datos para la toma de decisiones"
            }
        ]
    },
    {
        "code": "iq",
        "name": "Ingeniería Química",
        "specialties":[
            {
                "code": "AyCP",
                "name": "Ambiental y calidad en los procesos"
            }
        ]
    },
    {
        "code": "ige",
        "name": "Ingeniería en Gestión Empresarial",
        "specialties":[
            {
                "code": "WE",
                "name": "Gestión de la innovación y mejora continua"
            }
        ]
    },
    {
        "code": "ibq",
        "name": "Ingeniería Bioquímica",
        "specialties":[
            {
                "code": "BA",
                "name": "Biotecnología Aplicada"
            },
            {
                "code": "CyDPA",
                "name": "Ciencia y Desarrollo de Productos Alimentarios"
            }
        ]
    },
    {
        "code": "lt",
        "name": "Licenciatura en Turismo",
        "specialties":[
            {
                "code": "WE",
                "name": "Turismo sostenible y promoción turística"
            }
        ]
    }
]
*/
