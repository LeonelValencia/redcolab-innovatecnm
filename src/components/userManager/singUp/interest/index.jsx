import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useGetInterests } from "../../../webServices/interest";
import CircularSpinner from "../../../spinners";
import DataVerifier from "../../../webServices/tools";
import INTEREST_TOPICS from "./topics.json";
import "./interest.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;

export { INTEREST_TOPICS };

export default function Interest() {
  const { interests, loading } = useGetInterests();

  if (loading) {
    return <CircularSpinner />;
  }
  console.log(interests);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      {DataVerifier.isValidArray(interests) && <Cards interests={interests} />}
    </Box>
  );
}

const getRandomColor = (colors) => {
  const indiceAleatorio = Math.floor(Math.random() * colors.length);
  return colors[indiceAleatorio];
};

function Cards({ interests }) {
  const [_interests, set_interests] = useState(interests);
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit backgroundColor: "#FF5522" */}
      <Grid container spacing={2}>
        {_interests.map((interest, i) => {
          const topic = INTEREST_TOPICS[interest.area];
          const color = getRandomColor(topic.colors);
          const styleSelect = interest.isSelect
            ? {
                background: `linear-gradient(132deg, #FFFFFF 10%, ${color} 100%)`,
                border: `3px solid ${color}`,
              }
            : {
                background: `#ffffff`,
                border: `0px solid #000000`,
              };
          return (
            <Grid
              item
              key={"interest_" + interest._id + "_" + i}
              xs={12}
              sm={6}
              md={3}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  ...styleSelect,
                }}
                className="interestCard"
                onClick={() => {
                  const newInterest = [..._interests];
                  newInterest[i].isSelect = newInterest[i].isSelect
                    ? false
                    : true;
                  set_interests(newInterest);
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="caption">
                    {interest.area}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h2">
                    {interest.concept}
                  </Typography>
                  <Typography variant="body2">
                    {interest.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
