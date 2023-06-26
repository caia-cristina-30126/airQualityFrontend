import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export const LogoutDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully.");
        navigate("/signin");
      })
      .catch((error) => {
        // An error occurred during sign out
        console.error("Error signing out:", error);
      });
    handleClose();
  };

  return (
    <div>
      <ListItemButton onClick={handleClickOpen}>
        <ListItemIcon>
          <LogoutOutlinedIcon sx={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary={"Log out"} sx={{ fontWeight: 700 }} />
      </ListItemButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSignOut} autoFocus color="error">
            Log out
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
