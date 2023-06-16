import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "components/firebaseConfig";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { DivContentBody } from "styledComponentsAPI/Component";
import { useFormik } from "formik";
import * as Yup from "yup";
import background from "./background.jpg";
import axios from "axios";

const RegisterForm = () => {
  const [snackbar, setSnackbar] = React.useState(false);
  const closeSnackbar = () => {
    setSnackbar(false);
  };

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
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
        const email = userCredential.user.email;
        console.log(user);
        console.log(email);
        axios
          .post("http://localhost:8080/api/createUser", values)
          .then((response) => {
            console.log(response.data);
            console.log("values", values);
          })
          .catch((error) => {
            console.log(error);
          });
        navigate("/signin");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setSnackbar(true);
        } else {
          console.log(error.code, error.message);
        }
      }
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
          Register
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid display="flex" flexDirection="column" rowGap={4}>
            <TextField
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="First name"
              label="First name"
            />
            <TextField
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Last name"
              label="Last name"
            />
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
            <FormControl required>
              <InputLabel>Role permissions</InputLabel>
              <Select
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="viewer">Viewer</MenuItem>
              </Select>
            </FormControl>
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
      <Snackbar
        open={snackbar}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message="The email provided is already in use. Register with a different email address."
      />
    </DivContentBody>
  );
};

export default RegisterForm;
