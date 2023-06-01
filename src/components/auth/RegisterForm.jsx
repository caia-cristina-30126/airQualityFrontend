import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "components/firebaseConfig";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { DivContentBody } from "styledComponentsAPI/Component";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <DivContentBody>
      <Paper
        elevation={16}
        sx={{ padding: 3, minHeight: 300, minWidth: 600, borderRadius: 5 }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Register
        </Typography>
        <form>
          <Grid display="flex" flexDirection="column" rowGap={3}>
            <TextField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
              label="Email address"
            />
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              label="Password"
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              onClick={onSubmit}
              sx={{ height: 50 }}
            >
              Sign up
            </Button>
          </Grid>
        </form>
        <Typography sx={{ mt: 2 }} variant="h5" textAlign={"center"}>
          Already have an account?
        </Typography>
        <Typography textAlign={"center"} variant="h6">
          <NavLink to="/signin">Sign in</NavLink>
        </Typography>
      </Paper>
    </DivContentBody>
  );
};

export default RegisterForm;
