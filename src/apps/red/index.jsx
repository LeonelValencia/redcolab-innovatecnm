import React from "react";
import { useParams } from "react-router-dom";
import "./red.css";
import Typography from "@mui/material/Typography";
//import Login from '../../components/userManager/login'
import SingUp from "../../components/userManager/singUp";
//import Draw from '../../components/userManager/drawer'
import DrawNetwork from "./draw";
function Red() {
  const { site } = useParams();
  //user="+data.insertOneUser._id
  const params = new URLSearchParams(site);
  return (
    <div className="red-body">
      <div className="red-canvas">
        <DrawNetwork
          userId={params.get("userId")}
          isNewUser={params.get("newUser")}
          userInfo={{
            name: params.get("name"),
            color: params.get("color")
          }}
        />
      </div>
      <div className="red-footer">
        <Typography variant="body2" sx={{ color: "#FFFFFF" }} align="center">
          {`"Tecnología para la colaboración"`}
          <br />
          {`Redcolab Copyright ©`}
          {new Date().getFullYear()}
          <br />
        </Typography>
      </div>
    </div>
  );
}

export default Red;
