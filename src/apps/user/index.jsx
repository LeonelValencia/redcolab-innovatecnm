import React from "react";
import "./user.css";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useGetUserById } from "../../components/webServices/user";
import CircularSpinner from "../../components/spinners";
import Sections from "./sections";
import GeometricShapes from "./GeometricShapes";
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
      <GeometricShapes backgroundColor={user.uiConf.color} />

      {/* Foto de perfil y otros elementos de la portada */}
      <div className="img-container" >
        <div
          className="img-mask"
          style={{
            border: `5px solid ${user.uiConf.color}`,
            backgroundColor: user.uiConf.color,
          }}
        >
          <img src={user.image} width={200} alt="Foto de perfil" />
        </div>
      </div>
      <div className="section-container">
      <Sections user={user} />
      </div>
    </div>
  );
}
