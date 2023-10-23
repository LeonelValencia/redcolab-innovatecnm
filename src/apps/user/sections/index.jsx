import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
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
      color: user.uiConf.color,
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
        centered
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        sx={{
          borderBottom: "2px solid "+user.uiConf.color,
          "& .MuiTabs-indicator": {
            backgroundColor: "#1890ff",
          },
        }}
      >
        <Tab label="Resumen" />
        <Tab label="Actividad" />
        <Tab label="Valoraciones" />
        <Tab label="Proyectos" />
        <Tab label="Conocimiento" />
      </Tabs>
      {selectedTab === 0 && (
        <Typography component="div">
          {/* Contenido de la sección "Resumen" */}
        </Typography>
      )}
      {selectedTab === 1 && (
        <Typography component="div">
          {/* Contenido de la sección "Actividad" */}
        </Typography>
      )}
      {selectedTab === 2 && (
        <Typography component="div">
          {/* Contenido de la sección "Valoraciones" */}
        </Typography>
      )}
      {selectedTab === 3 && (
        <Typography component="div">
          {/* Contenido de la sección "Proyectos" */}
        </Typography>
      )}
      {selectedTab === 4 && (
        <Typography component="div">
          {/* Contenido de la sección "Conocimiento" */}
        </Typography>
      )}
    </div>
  );
}
