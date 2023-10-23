import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Activity from "./activity";
import Skills from "./skills";
//import { styled } from '@mui/material/styles';

export default function Sections({ user }) {
  const [selectedTab, setSelectedTab] = React.useState(0); // Estado para la pestaña seleccionada

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const sxCustom = {
    textTransform: "none",
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#ffffff",
      backgroundColor: user.uiConf.color,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  };
  return (
    <div>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        sx={{
          borderBottom: "2px solid " + user.uiConf.color,
          "& .MuiTabs-indicator": {
            backgroundColor: "#1890ff",
          },
        }}
      >
        <Tab sx={sxCustom} label="Actividad" />
        <Tab sx={sxCustom} label="Aptitudes" />
        <Tab sx={sxCustom} label="Conocimientos" />
        <Tab sx={sxCustom} label="Proyectos" />
        <Tab sx={sxCustom} label="Información" />
      </Tabs>
      {selectedTab === 0 && <Activity user={user} />}
      {selectedTab === 1 && <Skills user={user} />}
      {selectedTab === 2 && (
        <Typography component="div">
          {/* Contenido de la sección "Conocimientos" */}
        </Typography>
      )}
      {selectedTab === 3 && (
        <Typography component="div">
          {/* Contenido de la sección "Proyectos" */}
        </Typography>
      )}
      {selectedTab === 4 && (
        <Typography component="div">
          {/* Contenido de la sección "Información" */}
        </Typography>
      )}
      <br />
      <br />
      <br />
      <br />
      <Typography variant="body2" color="text.secondary" align="center">
        {`"Tecnología para la colaboración"`}
        <br />
        {`Redcolab Copyright ©`}
        {new Date().getFullYear()}
        <br />
      </Typography>
    </div>
  );
}
