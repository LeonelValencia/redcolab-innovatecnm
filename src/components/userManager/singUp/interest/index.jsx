import React, { useState } from "react";
import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import { useGetInterests } from "../../../webServices/interest";
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
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      {DataVerifier.isValidArray(interests) && (
        <Cards interests={interests} {...props} />
      )}
    </Box>
  );
}

const getRandomColor = (colors) => {
  const indiceAleatorio = Math.floor(Math.random() * colors.length);
  return colors[indiceAleatorio];
};

function Cards({ interests, formState, dispatch, setEnableStep, handleNext }) {
  const [_interests, set_interests] = useState(interests);
  const [selectInterests, setSelectInterests] = useState([
    ...formState.interest,
  ]);
  const [selectTopics, setTopic] = useState({ ...INTEREST_TOPICS });

  const handleSetInterest = () => {
    dispatch({
      type: "setInterest",
      interest: selectInterests,
    });
    setEnableStep(true);
    handleNext();
  };

  const handleSelect = (color, _id, index) => {
    const newInterest = [..._interests];
    let select = [...selectInterests];
    newInterest[index] = {...newInterest[index], color:color};
    if (newInterest[index].isSelect) {
      newInterest[index].isSelect = false;
      let indx = select.findIndex((s) => s === _id);
      select.splice(indx, 1);
    } else {
      newInterest[index].isSelect = true;
      select.push(_id);
    }
    setSelectInterests(select);
    set_interests(newInterest);
  };

  const handleTopicSelect = (key) => {
    const newsTopic = { ...selectTopics };
    newsTopic[key].isSelect = newsTopic[key].isSelect ? false : true;
    setTopic({ ...newsTopic });
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
          disabled={selectInterests.length < 1}
          onClick={handleSetInterest}
        >
          Continuar
        </Button>
      </div>
      <Container sx={{ py: 4 }} maxWidth="md">
        {/* End hero unit backgroundColor: "#FF5522" */}
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {Object.keys(selectTopics).map((key, i) => {
            const topic = selectTopics[key];
            const styleSelect = topic.isSelect
              ? {
                  background: `radial-gradient(circle, #FFFFFF 10%, ${topic.color} 100%)`,
                  border: `3px solid ${topic.color}`,
                }
              : {
                  background: `#ffffff`,
                  border: `1px solid #000000`,
                };
            return (
              <Chip
                label={topic.label}
                key={"topic_" + key}
                sx={{
                  ...styleSelect,
                }}
                className="interestCard"
                onClick={() => {
                  handleTopicSelect(key);
                }}
              />
            );
          })}
          {_interests.map((interest, i) => {
            const topic = INTEREST_TOPICS[interest.area];
            const color = interest?.color
              ? interest.color
              : getRandomColor(topic.colors);
            const isSelect = selectInterests.find((id) => id === interest._id)
              ? true
              : false;
            const styleSelect = isSelect
              ? {
                  background: `radial-gradient(circle, #FFFFFF 10%, ${topic.color} 100%)`,
                  border: `3px solid ${topic.color}`,
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
                  handleSelect(color, interest._id, i);
                }}
              />
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}
