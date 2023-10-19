import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Confetti from "react-confetti";
import "./singUp.css";
import { useNewUserService } from "../../webServices/user";
import { useNavigate } from "react-router-dom";

const ExplosiveButton = ({ formState }) => {
  const navigate = useNavigate()
  const [isPressed, setPressed] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [insertNewUser, { loading, data, error }] = useNewUserService();

  const buttonSpring = useSpring({
    width: isPressed ? "100%" : "100px",
    height: isPressed ? "100%" : "100px",
    transform: isPressed ? "scale(5)" : "scale(1)",
    backgroundColor: isPressed ? formState.uiConf.color : "#2c41ff",
    config: { duration: 1000 },
  });

  const explodeButton = () => {
    if (!isAnimate) {
      setPressed(!isPressed);
      if (!loading && !data) {
        insertNewUser({
          user: formState,
          onCompleted: (data) => {
            setTimeout(()=>{
              navigate("/red/user="+data.insertOneUser._id)
            },500)
          },
          onError: (error) => {
            console.error("error: ",error);
          },
        });
      }
    }
    setIsAnimate(true);
    setTimeout(() => {
      setIsRegister(!isRegister);
      setIsAnimate(false);
    }, 1100);
  };

  return (
    <div className="explosive-button-container">
      <animated.button
        className={`explosive-button ${isPressed ? "pressed" : ""}`}
        style={buttonSpring}
        onClick={explodeButton}
      >
        {isRegister ? "Continuar" : "Registrar"}
      </animated.button>
      {isRegister && <Confetti />}
    </div>
  );
};

export default function Save({ formState }) {
  //console.log(formState);
  return (
    <div>
      <ExplosiveButton formState={formState} />{" "}
    </div>
  );
}

