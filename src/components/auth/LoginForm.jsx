import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "components/firebaseConfig";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { DivContentBody } from "styledComponentsAPI/Component";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        userCredential.user.getIdToken().then((token) => {
          localStorage.setItem("accessToken", JSON.stringify(token));
        });
        navigate("/map");
        console.log("user", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <DivContentBody>
      <Paper
        elevation={16}
        sx={{ padding: 3, minHeight: 300, minWidth: 600, borderRadius: 5 }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Log in
        </Typography>
        <form>
          <Grid display="flex" flexDirection="column" rowGap={3}>
            <TextField
              label="Email address"
              name="email"
              type="email"
              required
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              name="password"
              type="password"
              label="Password"
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              onClick={onLogin}
              sx={{ height: 50 }}
            >
              Log In
            </Button>
          </Grid>
        </form>

        <Typography sx={{ mt: 2 }} variant="h5" textAlign={"center"}>
          No account yet?
        </Typography>
        <Typography textAlign={"center"} variant="h6">
          <NavLink to="/register">Sign up</NavLink>
        </Typography>
      </Paper>
    </DivContentBody>
  );
};

export default LoginForm;
