import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import MapIcon from "@mui/icons-material/Map";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { Collapse, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddIcon from "@mui/icons-material/Add";
import { SidebarSectionBox } from "styledComponentsAPI/Component";
import { LogoutDialog } from "components/LogoutDialog";
import logoAQI from "./logoAQI.png";

const drawerWidth = 250;

export const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openSection, setOpenSection] = React.useState(true);

  const handleOpenSection = () => {
    setOpenSection(!openSection);
  };

  const [openAccountSection, setOpenAccountSection] = React.useState(true);

  const handleOpenAccountSection = () => {
    setOpenAccountSection(!openAccountSection);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [anchorEl, setAnchorEl] = React.useState();

  /*   const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 */
  const navigate = useNavigate();

  const handleAccountButton = () => {
    navigate("/account");
    setAnchorEl(null);
  };
  const handleMapButton = () => {
    navigate("/map");
  };
  const handleSensorsListButton = () => {
    navigate("/sensors");
  };
  const handleSensorsAddButton = () => {
    navigate("/addSensor");
  };

  const drawer = (
    <>
      {/* <Toolbar /> */}
      <Divider />
      <Grid>{/*   <img src ={logoAQI} alt="logoAQI" /> */}</Grid>

      <Link to="/map" style={{ textDecoration: "none" }}>
        <Typography
          textAlign={"center"}
          variant="h5"
          fontWeight={"bold"}
          color="white"
        >
          <img
            src={logoAQI}
            alt="logoAQI"
            style={{ width: "150px", height: "150px" }}
          />
        </Typography>
      </Link>
      <Divider />

      <Grid
        container
        sx={{
          display: "flex",
          flexFlow: "column wrap",
          justifyContent: "space-between",
        }}
      >
        <Grid item>
          <SidebarSectionBox sx={{ mx: 2 }}>
            <ListItem
              disablePadding
              sx={{
                ":hover": {
                  background: "rgba(255, 255, 255, 0.08)",
                },
                borderRadius: 1,
              }}
            >
              <ListItemButton onClick={handleMapButton}>
                <ListItemIcon>
                  <MapIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"Map"} />
              </ListItemButton>
            </ListItem>
          </SidebarSectionBox>
          <SidebarSectionBox sx={{ mx: 2, my: 2 }}>
            <ListItemButton onClick={handleOpenSection}>
              <ListItemIcon>
                <PinDropIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Sensors" />
              {openSection ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openSection} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  disablePadding
                  sx={{
                    ":hover": {
                      background: "rgba(255, 255, 255, 0.08)",
                    },
                    borderRadius: 1,
                  }}
                >
                  <ListItemButton onClick={handleSensorsListButton}>
                    <ListItemIcon>
                      <FormatListBulletedIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary={"List"} sx={{ fontWeight: 700 }} />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{
                    ":hover": {
                      background: "rgba(255, 255, 255, 0.08)",
                    },
                    borderRadius: 1,
                  }}
                >
                  <ListItemButton onClick={handleSensorsAddButton}>
                    <ListItemIcon>
                      <AddIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary={"Add"} sx={{ fontWeight: 700 }} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
          </SidebarSectionBox>
        </Grid>
        <Grid item>
          <SidebarSectionBox sx={{ mx: 2 }}>
            <ListItemButton onClick={handleOpenAccountSection}>
              <ListItemIcon>
                <PinDropIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItemButton>
            <Grid sx={{ ml: 3 }}>
              <List component="div" disablePadding>
                <ListItem
                  disablePadding
                  sx={{
                    ":hover": {
                      background: "rgba(255, 255, 255, 0.08)",
                    },
                    borderRadius: 1,
                  }}
                >
                  <ListItemButton onClick={handleAccountButton}>
                    <ListItemIcon sx={{ color: "white" }}>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={"Details"}
                      sx={{ fontWeight: 700 }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{
                    ":hover": {
                      background: "rgba(255, 255, 255, 0.08)",
                    },
                    borderRadius: 1,
                  }}
                >
                  <LogoutDialog />
                </ListItem>
              </List>
            </Grid>
          </SidebarSectionBox>
        </Grid>
      </Grid>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        {/*   <Toolbar> */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          PaperProps={{
            sx: {
              color: "white",
              backgroundColor: "#111827",
              borderRadius: 1,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          PaperProps={{
            sx: {
              color: "white",
              backgroundColor: "#111827",
              borderRadius: 1,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};
