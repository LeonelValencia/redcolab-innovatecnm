import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Typography } from "@mui/material";
import Interests from "./interests";
import Login from "./login";
import FormProject from "../project/create/form";

export default function Super() {
  const [isSuper, setSuper] = useState(false);
  const [value, setValue] = useState()


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if(!isSuper){
    return <Login setSuper={setSuper} />
  }

  return (
    <div>
      {isSuper && (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Typography variant="h1" gutterBottom>
            Curación & Registro
          </Typography>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Intereses" value="1" />
                <Tab label="CRUD Proyectos" value="2" />
                <Tab label="Calibración IA" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1"><Interests /></TabPanel>
            <TabPanel value="2"><FormProject /></TabPanel>
            <TabPanel value="3">ERROR IP NO AUTORIZADA</TabPanel>
          </TabContext>
        </Box>
      )}
    </div>
  );
}
