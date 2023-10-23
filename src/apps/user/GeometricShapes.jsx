import React from "react";

function GeometricShapes({ backgroundColor, user }) {
  const shapes = [];

  for (let i = 0; i < 20; i++) {
    const shapeType = Math.random() < 0.5 ? "circle" : "rect";
    const shapeSize = Math.random() * 50 + 20; // Tamaño de la forma
    const shapeX = Math.random() * 100; // Posición X aleatoria
    const shapeY = Math.random() * 100; // Posición Y aleatoria
    const shapeColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;

    if (shapeType === "circle") {
      shapes.push(
        <circle
          key={i}
          cx={shapeX + "%"}
          cy={shapeY + "%"}
          r={shapeSize}
          fill={shapeColor}
        />
      );
    } else {
      shapes.push(
        <rect
          key={i}
          x={shapeX + "%"}
          y={shapeY + "%"}
          width={shapeSize}
          height={shapeSize}
          fill={shapeColor}
        />
      );
    }
  }

  return (
    <div className="img-container" >
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="100%" height="100%" fill={backgroundColor} />
        {shapes}
      </svg>
      <div
          className="img-mask"
          style={{
            border: `5px solid ${user.uiConf.color}`,
            backgroundColor: user.uiConf.color,
          }}
        >
          <img
            src={user.image}
            width={200}
            alt="Foto de perfil"
            style={{ width: "20vw" }}
          />
        </div>
    </div>
  );
}

export default GeometricShapes;
