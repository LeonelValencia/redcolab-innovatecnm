import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Login() {
  const NAVIGATE = useNavigate()
  return (
      <Drawer anchor={"right"} open={true}>
        <Box sx={{ width: 400 }} role="presentation">
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  NAVIGATE("/")
                }}
              >
                <ListItemIcon>
                  <ArrowBackIcon />
                </ListItemIcon>
                <ListItemText primary={"Regresar"} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          
        </Box>
      </Drawer>
  );
}
