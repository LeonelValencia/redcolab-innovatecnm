import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import Confetti from "react-confetti";
import "./singUp.css";
import { useNewUserService } from "../../webServices/user";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ReplayIcon from "@mui/icons-material/Replay";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const ExplosiveButton = ({ formState }) => {
  const navigate = useNavigate();
  const [isPressed, setPressed] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [insertNewUser, { loading, data, error }] = useNewUserService();

  const buttonSpring = useSpring({
    width: "100px",
    height: "100px",
    transform: isPressed ? "scale(20)" : "scale(1)",
    backgroundColor: isPressed ? formState.uiConf.color : "#2c41ff",
    config: { duration: 1000 },
  });

  const explodeButton = () => {
    /*
    let col = "#2c41ff"
    setTimeout(() => {
      navigate(`/userId=${134154653}&newUser=yes&name=Juanito Hola&color=${col.replace("#","")}`)
    }, 1500);
    if (!isAnimate) {
      setPressed(!isPressed);
    }
    */
    if (!isAnimate) {
      setPressed(!isPressed);
      if (!loading && !data) {
        insertNewUser({
          user: formState,
          onCompleted: (data) => {
            setTimeout(() => {
              navigate(
                `/newUser/userId=${data.insertOneUser._id}&newUser=yes&name=${
                  formState.personal.name
                }&color=${formState.uiConf.color.replace("#", "")}`
              );
            }, 500);
          },
          onError: (error) => {
            console.error("error: ", error);
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
    <div>
      <animated.button
        className={`explosive-button ${isPressed ? "pressed" : ""}`}
        style={buttonSpring}
        onClick={explodeButton}
      >
        {isRegister ? "Bienvenido" : "Registrar"}
      </animated.button>
      {isRegister && <Confetti />}
    </div>
  );
};

function ImageUpload({ formState, setImage }) {
  const videoRef = useRef(null);
  const [viewCamera, setViewCamera] = useState();
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraDevices, setCameraDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isMobile, setIsMobile] = useState(
    /Mobi|Android/i.test(navigator.userAgent)
  );
  const [isPhoto, setIsPhoto] = useState(true);

  useEffect(() => {
    async function getCameraDevices() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setCameraDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDevice(videoDevices[0]);
        }
      } catch (error) {
        setIsMobile(true);
        console.error("Error al obtener dispositivos de cámara:", error);
      }
    }
    getCameraDevices();
  },[]);

  const handleCamera = async () => {
    if (viewCamera) {
      viewCamera.getTracks().forEach((track) => track.stop());
      setViewCamera(undefined);
    } else {
      if (selectedDevice) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: selectedDevice.deviceId },
          });
          setViewCamera(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("No se pudo acceder a la cámara:", error);
        }
      }
    }
  };

  const handleChangeCamera = () => {
    if (cameraDevices.length > 1) {
      const indexSelect = cameraDevices.findIndex(
        (device) => device.deviceId === selectedDevice.deviceId
      );
      if (indexSelect + 1 === cameraDevices.length) {
        setSelectedDevice(cameraDevices[0]);
      } else {
        setSelectedDevice(cameraDevices[indexSelect + 1]);
      }
    }
  };

  const captureImage = async () => {
    if (!videoRef.current) {
      return;
    }
    // Captura la imagen del video
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas
      .getContext("2d")
      .drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    // Convierte la imagen en una representación de datos (base64)
    const imageData = canvas.toDataURL("image/jpeg");
    setCapturedImage(imageData);
    handleCamera();
  };

  const createInitialImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 150;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, 200, 150);

    // Establece el fondo del lienzo
    context.fillStyle = formState.uiConf.color;
    context.fillRect(0, 0, 200, 150);
    // Dibuja la letra inicial del nombre de usuario
    context.font = "100px Arial";
    context.fillStyle = "#ffffff";
    const userName =
      formState.personal.name === "" ? "P" : formState.personal.name;
    context.fillText(userName.toUpperCase(), 70, 100);
    const imageData = canvas.toDataURL("image/jpeg");
    setCapturedImage(imageData);
  };

  const saveImage = () => {
    if (capturedImage) {
      setImage(capturedImage);
      const controls = document.getElementById("cameraControls");
      if (controls) {
        controls.style.display = "none";
      }
    }
  };

  const handleBrowseClick = () => {
    videoRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        // Define el nuevo ancho y alto para la imagen
        const newWidth = 200; // Ancho deseado
        const newHeight = 150; // Alto deseado

        // Dibuja la imagen redimensionada en el canvas
        canvas.width = newWidth;
        canvas.height = newHeight;
        context.drawImage(image, 0, 0, newWidth, newHeight);
        // Convierte la imagen del canvas en base64
        const imageData = canvas.toDataURL("image/jpeg");
        setCapturedImage(imageData);
      };
    }
  };

  return (
    <div className="video-cont">
      <div>
        <div
          onClick={() => {
            if (isMobile) {
              handleBrowseClick();
            } else {
              handleCamera();
            }
            setCapturedImage(null);
          }}
          className="video-mask"
          style={{
            border: `5px solid ${formState.uiConf.color}`,
            backgroundColor: formState.uiConf.color,
          }}
        >
          {!viewCamera && (
            <div className="video-tag">
              <p style={{ color: "white", width: "150px" }}>
                Presiona para iniciar cámara
              </p>
            </div>
          )}
          {isMobile ? (
            <input
              ref={videoRef}
              width={200}
              type="file"
              accept="image/*"
              id="capture"
              capture="camera"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          ) : (
            <video ref={videoRef} width={200} autoPlay />
          )}
          <div className="video-result">
            {capturedImage && (
              <img src={capturedImage} width={200} alt="Imagen Capturada" />
            )}
          </div>
        </div>
      </div>
      <div id="cameraControls">
        {viewCamera ? (
          <div className="video-controls">
            {!capturedImage && (
              <>
                <Typography variant="caption" display="block" gutterBottom>
                  Presione para tomar foto
                </Typography>
                <IconButton
                  sx={{ backgroundColor: "#00ff00", padding: "30px" }}
                  onClick={captureImage}
                  aria-label="delete"
                  size="large"
                >
                  <PhotoCameraIcon fontSize="large" sx={{ color: "white" }} />
                </IconButton>
                <br />
                {cameraDevices.length > 1 && (
                  <Button onClick={handleChangeCamera} variant="contained">
                    cambiar Cámara
                  </Button>
                )}
              </>
            )}
          </div>
        ) : (
          <div>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="warning"
                startIcon={!captureImage && <ReplayIcon />}
                onClick={() => {
                  if (isMobile) {
                    handleBrowseClick();
                  } else {
                    handleCamera();
                  }
                  setIsPhoto(true);
                  setCapturedImage(null);
                }}
              >
                {capturedImage && isPhoto ? "Tomar Otra" : "Iniciar Cámara"}
              </Button>
              <Button
                variant="contained"
                color="success"
                endIcon={<SendIcon />}
                onClick={() => {
                  if (capturedImage) {
                    saveImage();
                  } else {
                    createInitialImage();
                    setIsPhoto(false);
                  }
                }}
              >
                {capturedImage ? "Continuar" : "En otro momento"}
              </Button>
            </Stack>
          </div>
        )}
      </div>

      <br />
    </div>
  );
}
export default function Save({ formState }) {
  const [isImage, setImage] = useState();
  let _formState = { ...formState };
  if (isImage) {
    _formState = { ...formState, image: isImage };
  }
  return (
    <Box
      sx={{
        marginTop: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Todo Listo!
      </Typography>
      <Typography component="h2" variant="h6" gutterBottom>
        Tomate una foto!
      </Typography>
      <ImageUpload setImage={setImage} formState={formState} />
      <Typography variant="caption" display="block" gutterBottom>
        Sonríe
      </Typography>
      {isImage && <ExplosiveButton formState={_formState} />}
    </Box>
  );
}
