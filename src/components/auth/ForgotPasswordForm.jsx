import React, { useState } from "react";
import { auth } from "components/firebaseConfig";
import { Button, Grid, Paper, TextField, Typography, Snackbar } from "@mui/material";
import { DivContentBody } from "styledComponentsAPI/Component";
import { sendPasswordResetEmail } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgotPasswordForm = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required"),
    }),
    onSubmit: (values) => {
      sendPasswordResetEmail(auth, values.email)
        .then(() => {
         
          setSnackbarMessage("Password reset email sent successfully");
          setSnackbarOpen(true);
        })
        .catch((error) => {
          console.error("Error sending password reset email:", error);

          if (error.code === "auth/invalid-email") {
            setSnackbarMessage("Invalid email format");
          } else if (error.code === "auth/user-not-found") {
            setSnackbarMessage("User not found");
          } else {
            setSnackbarMessage("Error sending password reset email");
          }
          setSnackbarOpen(true);
        });
    },
  });

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <DivContentBody>
    <Paper
      elevation={16}
      sx={{ padding: 3, minHeight: 300, minWidth: 600, borderRadius: 5 }}
    >
      <Typography variant="h4" sx={{ mb: 5 }}>
        Forgot Password
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
            helperText={formik.touched.email && formik.errors.email}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ height: 50 }}
          >
            Reset Password
          </Button>
        </Grid>
      </form>
      <Typography sx={{ mt: 5 }} variant="h5" textAlign={"center"}>
        Remember your password?
      </Typography>
      <Typography textAlign={"center"} variant="h6">
        <NavLink to="/signin">Sign in</NavLink>
      </Typography>
    </Paper>

    {/* Snackbar for displaying messages */}
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={5000}
      onClose={handleSnackbarClose}
      message={snackbarMessage}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    />
  </DivContentBody>
  );
};

export default ForgotPasswordForm;
