import { useSpring, animated } from "react-spring";
import Confetti from "react-confetti";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useReducer, useState } from "react";
import helpCars from "./cards.json";
import DataVerifier from "../../../components/webServices/tools";
import { useNavigate } from "react-router-dom";


function reducer(state, action) {
  let _state = { ...state };
  if (DataVerifier.isValidArray(action.actions)) {
    action.actions.forEach((actionName) => {
      switch (actionName) {
        case "stopConfeti":
          _state = { ..._state, confetti: false };
          break;
        case "startConfeti":
          _state = { ..._state, confetti: true };
          break;
        case "showUser":
          _state = { ..._state, user: true };
          break;
        case "hideUser":
          _state = { ..._state, user: false };
          break;
        case "viewOptions":
          _state = { ..._state, viewOptions: true };
          break;
        default:
          break;
      }
    });
  }
  return _state;
}

export default function UserWelcome({
  userId,
  userInfo = { name: "", color: "#000000" },
}) {
  const [state, dispatch] = useReducer(reducer, {
    confetti: true,
    user: false,
    viewOptions: false,
  });
  const { name, color } = userInfo;
  const navigate = useNavigate()
  const buttonSpring = useSpring({
    width: state.user ? "200px" : "0px",
    height: state.user ? "200px" : "0px",
    transform: state.user ? "scale(1)" : "scale(0)",
    duration: 500,
  });

  const messageSpring = useSpring({
    from: {
      transform: "scale(0)",
    },
    to: {
      transform: "scale(1)",
    },
    config: { duration: 1000 },
    delay: 1000,
  });
  //console.log(state);
  return (
    <div className="newUserHelpContainer" style={welcomeContainer}>
      <animated.button
        style={{
          ...buttonSpring,
          ...welcomeButton,
          backgroundColor: "#" + color,
        }}
        onClick={()=>{navigate("/user/"+userId)}}
      >
        <p>
          <b>{name}</b>
        </p>
      </animated.button>
      <animated.div className={"newUserMessage"} style={messageSpring} dela>
        <CarouselCard
        goUser={()=>{navigate("/user/"+userId)}}
        goRed={()=>{navigate("/")}}
        viewOptions={state.viewOptions}
          cards={helpCars}
          onAction={(actions, actionValue) => {
            dispatch({ actions: actions, value: actionValue });
          }}
        />
      </animated.div>
      {state.confetti && <Confetti />}
    </div>
  );
}

const welcomeContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const welcomeButton = {
  color: "#ffffff",
  border: "none",
  borderRadius: "50%",
  width: "100px",
  height: "100px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
};

export function CarouselCard({ cards = [], onAction = () => {}, viewOptions=false, goUser, goRed }) {
  const [indexCard, setIndexCard] = useState(0);
  const card = cards[indexCard];
  const handleChangeCard = (index) => {
    const newCard = cards[index];
    setIndexCard(index);
    onAction(newCard.actions, {});
  };

  return (
    <Card variant="outlined" sx={{backgroundColor: "#FFFFFFaa"}} >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {card.subtitle}
        </Typography>
        <Typography variant="h5" component="div">
          {card.title}
        </Typography>
        <Typography variant="body2">{card.description}</Typography>
      </CardContent>
      <CardActions>
        {indexCard > 0 && (
          <Button
            size="small"
            onClick={() => {
              handleChangeCard(indexCard - 1);
            }}
          >
            anterior
          </Button>
        )}
        {indexCard < cards.length - 1 && (
          <Button
            onClick={() => {
              handleChangeCard(indexCard + 1);
            }}
            size="small"
          >
            siguiente
          </Button>
        )}
        {viewOptions && (
          <>
          <Button
            onClick={goUser}
            size="small"
          >
            ir a mi perfil
          </Button>
          <Button
            onClick={goRed}
            size="small"
          >
            ir a Red
          </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}
