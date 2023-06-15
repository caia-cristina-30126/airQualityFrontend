import React from "react";
import { NavLink } from "react-router-dom";

import { Paper, Typography } from "@mui/material";
import { DivContentBody } from "styledComponentsAPI/Component";
import background from "./auth/background.jpg";

const NotAuthneticatedUser = () => {
  return (
    <DivContentBody
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <Paper
        elevation={16}
        sx={{
          padding: 3,
          minHeight: 400,
          minWidth: 600,
          borderRadius: 5,
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 5, color: "red", fontWeight: "bold", textAlign: "center" }}
        >
          Permissions restricted
        </Typography>
        <Typography variant="h6" fontWeight="bold" textAlign={"center"}>
          You are not authenticated.
        </Typography>
        <Typography textAlign={"center"} variant="h6" fontWeight="bold">
          <NavLink to="/signin">Sign in</NavLink> with an email and password
        </Typography>
        <Typography
          sx={{ mt: 5 }}
          variant="h6"
          textAlign={"center"}
          fontWeight="bold"
        >
          No account yet?
        </Typography>
        <Typography textAlign={"center"} variant="h6" fontWeight="bold">
          <NavLink to="/register">Sign up here</NavLink>
        </Typography>
        <Typography
          sx={{ mt: 5 }}
          variant="h6"
          textAlign={"center"}
          fontWeight="bold"
        >
          Have an account but met some troubles while sign-in?
        </Typography>
        <Typography textAlign={"center"} variant="h6">
          <NavLink to="/forgotPassword">Forgot password</NavLink>
        </Typography>
      </Paper>
    </DivContentBody>
  );
};

export default NotAuthneticatedUser;
