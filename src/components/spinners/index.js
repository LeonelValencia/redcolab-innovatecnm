import React from "react";
import CircularProgress from "@mui/material/CircularProgress";


function CircularSpinner(props) {
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <CircularProgress {...props} />
    </div>
  );
}

export default CircularSpinner;
