import React, { useState } from "react";
import { auth } from "components/firebaseConfig";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";
import { DivContentBody } from "styledComponentsAPI/Component";
import { sendPasswordResetEmail } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import background from "./background.jpg";

const ForgotPasswordForm = () => {
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarFeedback, setsnackbarFeedback] = useState("");

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
          setsnackbarFeedback(
            "An email for resetting the password was sent successfully!"
          );
          setSnackbar(true);
        })
        .catch((error) => {
          setsnackbarFeedback(
            "Error sending email for resetting the password:" + { error }
          );

          if (error.code === "auth/invalid-email") {
            setsnackbarFeedback("Invalid email format");
          } else if (error.code === "auth/user-not-found") {
            setsnackbarFeedback("User with provided email address not found");
          } else {
            setsnackbarFeedback(
              "Error sending email for resetting the password"
            );
          }
          setSnackbar(true);
        });
    },
  });

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  return (
    <DivContentBody
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
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
      <Snackbar
        open={snackbar}
        message={snackbarFeedback}
        onClose={handleCloseSnackbar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </DivContentBody>
  );
};

export default ForgotPasswordForm;
