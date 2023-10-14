import React from 'react'
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function SelectAcademicInfo({
    academic,
    setIndexAcademic,
    indexAcademic,
}) {

    const handleChange = (event) => {
        setIndexAcademic(event.target.value);
      };

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
          Información Académica
        </Typography>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="academicSelection">Selecciona información académica</InputLabel>
        <Select
          labelId="academicSelection"
          id="demo-simple-select-standard"
          value={indexAcademic?indexAcademic:""}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {academic.map((info, index)=>{
            return <MenuItem key={"itemAcademic_"+index} value={index}>{info.degree.key}</MenuItem>
          })}
        </Select>
      </FormControl>
      </Box>
      </Container>
  )
}
