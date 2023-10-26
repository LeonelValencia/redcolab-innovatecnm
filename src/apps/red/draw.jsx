import { useGetAllUsers } from "../../components/webServices/user";
import CircularSpinner from "../../components/spinners";
import UserWelcome from "./newUser";
import CytoscapeComponent from "react-cytoscapejs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DrawNetwork({ userId, isNewUser, userInfo }) {
  /*let users = [];
  let loading = false;*/
  const [cy, setCy] = useState();
  const navigation = useNavigate();
  const { users, loading } = useGetAllUsers();
  const [animated, setAnimated] = useState(false);

  console.log(users);

  useEffect(() => {
    if (cy) {
      if (!animated) {
        cy.nodes().forEach((node) => {
          //console.log(node.position('x'));
          setTimeout(() => {
            animateNode(node);
          }, Math.floor(Math.random() * 5000));
        });
        cy.nodes().on("tap", (event) => {
          const node = event.target;
          node.stop();
          navigation("/user/" + node.id());
          console.log("Nodo clicado:", node.id());
          // Realiza aquí la lógica que desees cuando se haga clic en el nodo.
        });
        console.log("animated");
        setAnimated(true);
      }
    }
  }, [animated, cy, navigation]);

  if (loading) {
    return <CircularSpinner />;
  }

  let cyConfig = {
    elements: [
      {
        data: { id: "redColab", label: "Redcolab" },
        style: { shape: "rectangle", "background-color": "#00A2FA" },
      },
    ],
    style: [
      {
        selector: "node",
        style: {
          content: "data(label)",
        },
      },
      {
        selector: "edge",
        style: {
          content: "data(label)",
          "line-color": "#999999",
        },
      },
    ],
  };

  const layout = { name: "random" };

  users.forEach((user) => {
    cyConfig.elements.push({
      data: { id: user._id, label: user.personal.name },
      style: {
        "background-color": user.uiConf.color,
      },
    });
    cyConfig.elements.push({
      data: { id: "edge" + user._id, source: user._id, target: "redColab" },
    });
  });

  return (
    <div>
      {isNewUser === "yes" && (
        <UserWelcome userId={userId} userInfo={userInfo} />
      )}
      <CytoscapeComponent
        elements={cyConfig.elements}
        style={{ width: "100%", height: "100vh" }}
        stylesheet={cyConfig.style}
        layout={layout}
        minZoom={0.75}
        maxZoom={2}
        cy={(cy) => {
          setCy(cy);
        }}
      />
    </div>
  );
}

function animateNode(node) {
  node
    .animation({
      position: {
        x:
          Math.floor(Math.random() * 50) * (Math.random() < 0.5 ? -1 : 1) +
          node.position("x"), // Posición X aleatoria
        y:
          Math.floor(Math.random() * 50) * (Math.random() < 0.5 ? -1 : 1) +
          node.position("y"), // Posición Y aleatoria
      },
      duration: 10000,
      //easing: 'ease-in-out', // Efecto de aceleración/desaceleración
    })
    .play()
    .promise()
    .then(() => {
      // Cuando la animación termina, inicia una nueva animación
      setTimeout(() => {
        animateNode(node);
      }, Math.floor(Math.random() * 5000));
    });
}
