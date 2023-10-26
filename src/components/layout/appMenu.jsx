import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { IconColabConnect } from "../icons";
import { useUserContext } from "../userManager/authProvider";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";

const pages = [
  {
    label: "Red",
    url: "/",
  },
  {
    label: "Proyectos",
    url: "/proyectos",
  },
  {
    label: "RoadMaps",
    url: "/roadmaps",
  },
];
const USER_SETTINGS = [
  {
    label: "Perfil",
    url: "/user",
  },
  {
    label: "Mis Proyectos",
    url: "/myProjects",
  },
  {
    label: "Mis RoadMaps",
    url: "/myRoadMap",
  },
  {
    label: "Mi Red",
    url: "/userNet",
  },
];

export default function AppMenu() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const USER = useUserContext();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconColabConnect
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            REDCOLAB
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.url);
                  }}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <IconColabConnect
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            REDCOLAB
          </Typography>
          <Tooltip title="registro">
            <Button
              onClick={() => {
                navigate("/signUp");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              ¡Pre-Registro!
            </Button>
          </Tooltip>
          {USER.isAuth && <UserMenu USER={USER} navigate={navigate} />}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(page.url);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          {USER.isAuth ? (
            <UserMenu USER={USER} navigate={navigate} />
          ) : (
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Tooltip title="registro">
                <Button
                  onClick={() => {
                    navigate("/signUp");
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  ¡Pre-Registro!
                </Button>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function UserMenu({ USER, navigate }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {USER_SETTINGS.map((setting) => (
          <MenuItem
            key={setting.label}
            onClick={() => {
              handleCloseUserMenu();
              navigate(setting.link);
            }}
          >
            <Typography textAlign="center">{setting.label}</Typography>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            USER.signOut().then(() => {
              navigate("/login");
            });
          }}
        >
          <Typography textAlign="center">Cerrar Sesión</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
