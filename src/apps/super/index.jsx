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

export default function Super() {
  const [isSuper, setSuper] = useState(0);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (isSuper === 0) {
      if (getSuper()) {
        setSuper(1);
      } else {
        setSuper(2);
      }
    }
  }, [isSuper]);
  return (
    <div>
      {isSuper === 1 && (
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
                <Tab label="Item Two" value="2" />
                <Tab label="Item Three" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1"><Interests /></TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
      )}
      {isSuper === 2 && <Navigate to={"/"} />}
    </div>
  );
}

function getSuper() {
  let supPass = prompt("Please enter Super Password");
  if (!supPass || supPass === "") {
    return false;
  }
  return supPass === process.env.REACT_APP_SUPER;
}
