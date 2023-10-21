import { useGetAllUsers } from "../../components/webServices/user";
import CircularSpinner from "../../components/spinners";
import { useSpring, animated } from "react-spring";
import Confetti from "react-confetti";

export default function DrawNetwork({ userId, isNewUser, userInfo }) {
  let users = [];
  let loading = false;
  //const { users, loading } = useGetAllUsers();
  console.log(userInfo);

  if (loading) {
    return <CircularSpinner />;
  }

  return (
    <div>
      {isNewUser === "yes" && (
        <UserWelcome userId={userId} userInfo={userInfo} />
      )}
      network
    </div>
  );
}

function UserWelcome({ userId, userInfo = { name: "", color: "#000000" } }) {
  const { name, color } = userInfo;
  const buttonSpring = useSpring({
    from: {
      width: "200px",
      height: "200px",
      transform: "scale(20)",
    },
    to: {
      width: "100px",
      height: "100px",
      transform: "scale(1)",
    },
    config: { duration: 2000 },
  });
  return (
    <div style={welcomeContainer}>
      <animated.button style={{ ...buttonSpring, ...welcomeButton, backgroundColor: "#"+color }} >
        <p><b>{name}</b></p>
      </animated.button>
      <Confetti />
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
