import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { UpdateForm } from "util/UpdateForm";

export const AccountGeneralSettings = (props) => {
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarFeedback, setsnackbarFeedback] = useState("");
  const [userData, setUserData] = useState(null);
  const eemail = localStorage.getItem("email");
  console.log(eemail);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          console.log("email", idTokenResult.claims.email);
          const fetchUser = async () => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/getUser`,
                {
                  headers: { email: eemail },
                }
              );
              setUserData(response.data);
              console.log();
            } catch (error) {
              console.error("Error fetching sensor:", error);
            }
          };
          fetchUser();
        });
      } else {
        console.log("User is signed out");
      }
    });
  }, []);

  console.log("user data", userData);
  const handleSubmit = async (values) => {
    const { email, firstName, lastName } = values;

    const userData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/updateUser`,
        userData
      );

      if (response.status === 200) {
        setsnackbarFeedback("User details updated successfully!");
        setSnackbar(true);
      } else {
        setsnackbarFeedback("Error updating user details");
        setSnackbar(true);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  return (
    <Box sx={{ mt: 4 }} {...props}>
      <Card sx={{ p: 2, backgroundColor: "#f5f5f0" }}>
        <CardContent>
          {userData ? (
            <Formik
              initialValues={{
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
              }}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange }) => (
                <Form>
                  <UpdateForm
                    title="Identifiers"
                    content={
                      <Field
                        as={TextField}
                        label="Email"
                        name="email"
                        disabled
                        value={values.email}
                        onChange={handleChange}
                        fullWidth
                        sx={{ my: 2 }}
                      />
                    }
                  />
                  <Divider sx={{ my: 2 }} />
                  <UpdateForm
                    title="Basic details"
                    content={
                      <>
                        <Field
                          as={TextField}
                          label="First Name"
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          fullWidth
                          sx={{ my: 2 }}
                        />

                        <Field
                          as={TextField}
                          label="Last Name"
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          fullWidth
                          sx={{ my: 2 }}
                        />
                      </>
                    }
                  />
                  <Grid
                    container
                    spacing={2}
                    sx={{ display: "flex", flexFlow: "column" }}
                  >
                    <Divider sx={{ mt: 3 }} variant="middle" />
                    <Grid item xs={12}>
                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ height: 50, mt: 1, backgroundColor: "#0488f3" }}
                        >
                          Save changes
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          ) : (
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress size={40} />
            </Grid>
          )}
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar}
        message={snackbarFeedback}
        onClose={() => setSnackbar(false)}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Box>
  );
};
