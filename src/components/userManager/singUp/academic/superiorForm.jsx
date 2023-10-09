import React, { useState } from "react";
import DataVerifier from "../../../webServices/tools";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function SuperiorForm({
  endDate,
  schoolSet,
  setForm,
  form,
  setInputsInvalid = () => {},
}) {
  const [course, setCourse] = useState({});
  const [specialtyCode, setSpecialty] = useState("");
  const description = endDate
    ? form.degree.description
    : form.studyStatus.course.description;
  return (
    <>
      {DataVerifier.isValidArray(schoolSet.courses) && (
        <>
          <Grid item xs={12} sm={12}>
            <InputLabel>Selecciona tu carrera</InputLabel>
            <Select
              labelId="demo-simple-select-labelSelectSchool"
              fullWidth
              id="selectCourse"
              value={form.studyStatus.course.code}
              label="Nivel de Estudio"
              onChange={(event) => {
                const value = event.target.value;
                const course = schoolSet.courses.find((s) => s.code === value);
                if (course) {
                  setCourse(course);
                  setForm({
                    ...form,
                    studyStatus: {
                      ...form.studyStatus,
                      course: {
                        ...form.studyStatus.course,
                        name: course.name,
                        code: course.code,
                      },
                    },
                  });
                }
              }}
            >
              {schoolSet.courses.map((course) => (
                <MenuItem key={course.code} value={course.code}>
                  {course.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </>
      )}
      {!endDate && (
        <>
          {DataVerifier.isValidArray(course?.specialties) && (
            <Grid item xs={12} sm={12}>
              <InputLabel>Selecciona tu especialidad</InputLabel>
              <Select
                labelId="especial"
                fullWidth
                id="selectSpecial"
                value={specialtyCode}
                label="Nivel de Estudio"
                onChange={(event) => {
                  const value = event.target.value;
                  const specialty = course.specialties.find(
                    (s) => s.code === value
                  );
                  if (specialty) {
                    setSpecialty(specialty.code);
                    setForm({
                      ...form,
                      studyStatus: {
                        ...form.studyStatus,
                        course: {
                          ...form.studyStatus.course,
                          specialty: specialty.name,
                        },
                      },
                    });
                  }
                }}
              >
                {course.specialties.map((specialty) => (
                  <MenuItem key={specialty.code} value={specialty.code}>
                    {specialty.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </>
      )}
      <Grid item xs={12} sm={12}>
        <InputLabel>
          {endDate
            ? "Cuéntanos sobre tu profesión"
            : "Cuéntanos sobre tus actividades académicas"}
        </InputLabel>
        <TextField
          label="academicDescription"
          multiline
          fullWidth
          rows={4}
          value={description}
          onChange={(event) => {
            const value = event.target.value;
            if (endDate) {
              setForm({
                ...form,
                degree: { ...form.degree, description: value },
              });
            } else {
              setForm({
                ...form,
                studyStatus: {
                  ...form.studyStatus,
                  course: { ...form.studyStatus.course, description: value },
                },
              });
            }
          }}
        />
      </Grid>
    </>
  );
}
