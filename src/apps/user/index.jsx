import React from "react";
import "./user.css";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useGetUserById } from "../../components/webServices/user";
import CircularSpinner from "../../components/spinners";
import Sections from "./sections";
import GeometricShapes from "./GeometricShapes";
import Typography from "@mui/material/Typography";

//import { useUserContext } from '../../components/userManager/authProvider'
// const UserContext = useUserContext()
// const {name,/*email*/}= UserContext.getUser()

export default function User() {
  const { id, site } = useParams();
  if (id) {
    return <Main id={id} site={site} />;
  }
  return <Navigate to={"/users"} />;
}

function Main({ id }) {
  const { user, loading, error } = useGetUserById(id);
  if (loading) {
    return <CircularSpinner />;
  }
  if (error) {
    console.log("error: ", error);
    return <>error;</>;
  }
  console.log(user);
  return (
    <div>
      <GeometricShapes backgroundColor={user.uiConf.color} user={user} />
      <Typography variant="h1">{user.personal.name}</Typography>
      <div className="section-container">
        <Sections user={user} />
      </div>
    </div>
  );
}
