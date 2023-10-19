import React, { useState } from "react";
import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import { useGetInterests } from "../../../webServices/interest";
import { trendInterestVectorSchema } from "../../../webServices/user";
import CircularSpinner from "../../../spinners";
import DataVerifier from "../../../webServices/tools";
import INTEREST_TOPICS from "./topics.json";
import Typography from "@mui/material/Typography";
import "./interest.css";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export { INTEREST_TOPICS };

export default function Interest(props) {
  const { interests, loading } = useGetInterests();

  if (loading) {
    return <CircularSpinner />;
  }
  if (DataVerifier.isValidArray(interests)) {
    let _interests = interests.map((interest) => {
      let activeInterest = { ...interest };
      if (props.formState.interest.find((id) => id === interest._id)) { 
        activeInterest["isSelect"] = true;
      }else{
        activeInterest["isSelect"] = false;
      }
      
      return activeInterest;
    });
    return (
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Cards interests={_interests} {...props} />
      </Box>
    );
  }

  return <></>;
}

const getRandomColor = (colors) => {
  const indiceAleatorio = Math.floor(Math.random() * colors.length);
  return colors[indiceAleatorio];
};

function getTrendInterest(interests = []) {
  let formal = 0;
  let nature = 0;
  let social = 0;
  let color = "#999999"
  let vector = {...trendInterestVectorSchema }

  // Sumar de vector
  for (const interest of interests) {
    formal += interest.vector.formal;
    social += interest.vector.social;
    nature += interest.vector.nature;
  }
  // Promediar vector
  const numInterests = interests.length;
  vector = {
    nature: Math.round(nature / numInterests),
    formal: Math.round(formal / numInterests),
    social: Math.round(social / numInterests),
  };
  //GenerarColor
  color = `#${vector.social.toString(16)}${vector.nature.toString(16)}${vector.formal.toString(16)}`
  
  return {color, vector}
}

function Cards({ interests, formState, dispatch, setEnableStep, handleNext }) {
  const [_interests, set_interests] = useState(interests);
  const [count, setCount] = useState(formState.interest.length)

  const handleSetInterest = () => {
    let interestIds = []
    let selectedInterests = []
    _interests.forEach(interest => {
      if(interest.isSelect){
        interestIds.push(interest._id)
        selectedInterests.push(interest)
      }
    });
    const {color, vector} = getTrendInterest(selectedInterests)
    dispatch({
      type: "setInterest",
      interest: interestIds,
      trendInterest: vector,
      color: color
    });
    setEnableStep(true);
    handleNext();
  };

  const handleSelect = (color, index) => {
    const newInterest = [..._interests];
    if (!newInterest[index]?.color) {
      newInterest[index] = { ...newInterest[index], color: color };
    }
    newInterest[index].isSelect = !newInterest[index].isSelect;
    if (newInterest[index].isSelect) {
      setCount(count+1)
    }else{
      setCount(count-1)
    }
    set_interests(newInterest);
  };

  return (
    <Box
      sx={{
        marginTop: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ position: "sticky", top: 0, zIndex: "5" }}>
        <Typography component="h1" variant="h5">
          Selecciona tus intereses
        </Typography>

        <Button
          fullWidth
          variant="contained"
          disabled={count < 5}
          onClick={handleSetInterest}
        >
          Continuar
        </Button>
      </div>
      <Container sx={{ py: 4 }} maxWidth="md">
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {_interests.map((interest, i) => {
            //console.log(interest.vector);
            const color = interest?.color
              ? interest.color
              : getRandomColor(INTEREST_TOPICS[interest.area].colors);
            const styleSelect = interest.isSelect
              ? {
                  background: `radial-gradient(circle, #FFFFFF 10%, ${color} 100%)`,
                  border: `3px solid ${color}`,
                }
              : {
                  background: `#ffffff`,
                  border: `1px solid #000000`,
                };
            return (
              <Chip
                label={interest.concept}
                key={interest._id}
                sx={{
                  ...styleSelect,
                }}
                className="interestCard"
                onClick={() => {
                  handleSelect(color, i);
                }}
              />
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}
