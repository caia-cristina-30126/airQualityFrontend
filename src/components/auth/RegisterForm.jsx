import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "components/firebaseConfig";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { DivContentBody } from "styledComponentsAPI/Component";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegisterForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: async (values) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;
        console.log(user);
        navigate("/signup");
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    },
  });


  return (
    <DivContentBody>
      <Paper
        elevation={16}
        sx={{ padding: 3, minHeight: 400, minWidth: 600, borderRadius: 5 }}
      >
        <Typography variant="h4" sx={{ mb: 5 }}>
          Register
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid display="flex" flexDirection="column" rowGap={4}>
            <TextField
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              placeholder="Email address"
              label="Email address"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              placeholder="Password"
              label="Password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputLabelProps={{ shrink: true }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
              sx={{ height: 50 }}
            >
              Sign up
            </Button>
          </Grid>
        </form>
        <Typography sx={{ mt: 5 }} variant="h5" textAlign={"center"}>
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
