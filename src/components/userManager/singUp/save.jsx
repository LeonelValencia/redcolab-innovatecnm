import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Confetti from 'react-confetti';
import './singUp.css'

const ExplosiveButton = () => {
  const [isPressed, setPressed] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false)
  const [isRegister, setIsRegister] = useState(false)

  const buttonSpring = useSpring({
    width: isPressed ? '100%' : '100px',
    height: isPressed ? '100%' : '100px',
    transform: isPressed ? 'scale(5)' : 'scale(1)',
    config: { duration: 1000 },
  });

  const explodeButton = () => {
    if(!isAnimate){
      setPressed(!isPressed);
    }
    setIsAnimate(true)
    setTimeout(() => {
      setIsRegister(!isRegister)
      setIsAnimate(false)
    }, 1100);
  };

  return (
    <div className="explosive-button-container">
      <animated.button
        className={`explosive-button ${isPressed ? 'pressed' : ''}`}
        style={buttonSpring}
        onClick={explodeButton}
      >
        {isRegister ? "Continuar" : "Registrar"}
      </animated.button>
      {isRegister && <Confetti />}
    </div>
  );
};


export default function Save() {
  return (
    <div><ExplosiveButton/> </div>
  )
}
