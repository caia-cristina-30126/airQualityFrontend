import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "components/firebaseConfig";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { DivContentBody } from "styledComponentsAPI/Component";
import { useFormik } from "formik";
import * as Yup from "yup";
import background from "./background.jpg";

const LoginForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values, { setSubmitting, setErrors }) => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          userCredential.user.getIdToken().then((token) => {
            localStorage.setItem("accessToken", JSON.stringify(token));
          });
          localStorage.setItem("email", userCredential.user.email);
          navigate("/map");
          console.log("user", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            setErrors({ password: "Invalid password" });
          } else if (errorCode === "auth/user-not-found") {
            setErrors({ email: "User not found" });
          } else {
            console.log(errorCode, errorMessage);
          }
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <DivContentBody
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <Paper
        elevation={16}
        sx={{ padding: 3, minHeight: 400, minWidth: 600, borderRadius: 5 }}
      >
        <Typography variant="h4" sx={{ mb: 5 }}>
          Log in
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid display="flex" flexDirection="column" rowGap={4}>
            <TextField
              label="Email address"
              name="email"
              type="email"
              required
              placeholder="Email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""
              }
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              name="password"
              type="password"
              label="Password"
              required
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""
              }
              InputLabelProps={{ shrink: true }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
              sx={{ height: 50 }}
            >
              Log In
            </Button>
          </Grid>
        </form>

        <Typography sx={{ mt: 5 }} variant="h5" textAlign={"center"}>
          No account yet?
        </Typography>
        <Typography textAlign={"center"} variant="h6">
          <NavLink to="/register">Sign up</NavLink>
        </Typography>

        <Typography textAlign={"center"} sx={{ mt: 2 }} variant="h5">
          <NavLink to="/forgotPassword">Forgot password</NavLink>
        </Typography>
      </Paper>
    </DivContentBody>
  );
};

export default LoginForm;
