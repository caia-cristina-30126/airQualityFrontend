import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  CssBaseline,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Sidebar } from "components/sidebar/Sidebar";
import React from "react";
import axios from "axios";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SpaceBetweenGrid } from "styledComponentsAPI/Component";
import { auth } from "components/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const AddSensorContentPage = () => {
  const [snackbar, setSnackbar] = React.useState(false);
  const [snackbarFeedback, setsnackbarFeedback] = React.useState("");

  const addSensorValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    location: Yup.object().shape({
      latitude: Yup.number().required("Latitude is required"),
      longitude: Yup.number().required("Longitude is required"),
    }),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const tokenFromLocalStorage = localStorage.getItem("accessToken");
        const token = tokenFromLocalStorage.substring(
          1,
          tokenFromLocalStorage.length - 1
        );
        const fetchSensors = async () => {
          try {
            axios.interceptors.request.use(function (config) {
              const token = localStorage.getItem("accessToken");
              if (token !== undefined) {
                config.headers.Authorization = token;
              }
              return config;
            });
            const response = await axios.post(
              "http://localhost:8080/api/createSensor",
              values,
              {
                headers: {
                  idToken: token,
                },
              }
            );

            if (response.status === 200) {
              setsnackbarFeedback("Sensor created successfully!");
              setSnackbar(true);
            } else {
              setsnackbarFeedback("Error creating sensor");
              setSnackbar(true);
            }

            console.log(response.data);
            resetForm();
          } catch (error) {
            console.error(error);
          } finally {
            setSubmitting(false);
          }
        };
        fetchSensors();
      } else {
        console.log("not authenticated");
        setsnackbarFeedback("User is not authenticated!");
        setSnackbar(true);
      }
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, marginTop: "72px" }}>
        <CssBaseline />
        <Typography
          variant="h4"
          fontWeight={"bold"}
          textAlign={"center"}
          sx={{ mb: 5 }}
        >
          New sensor
        </Typography>
        <Container maxWidth="xl">
          <Card>
            <CardContent>
              <Formik
                initialValues={{
                  active: true,
                  name: "",
                  location: { latitude: "", longitude: "" },
                  measurementsType: [],
                }}
                validationSchema={addSensorValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Grid
                      container
                      spacing={2}
                      sx={{ display: "flex", flexFlow: "column" }}
                    >
                      <Grid item>
                        <Field
                          as={TextField}
                          label="Name"
                          type="text"
                          name="name"
                          fullWidth
                        />
                        <ErrorMessage name="name">
                          {(errorText) => (
                            <Typography color={"red"}>{errorText}</Typography>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item>
                        <Field
                          as={TextField}
                          label="Latitude"
                          type="number"
                          name="location.latitude"
                          fullWidth
                        />
                        <ErrorMessage name="location.latitude">
                          {(errorText) => (
                            <Typography color={"red"}>{errorText}</Typography>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item>
                        <Field
                          as={TextField}
                          label="Longitude"
                          type="number"
                          name="location.longitude"
                          fullWidth
                        />
                        <ErrorMessage name="location.longitude">
                          {(errorText) => (
                            <Typography color={"red"}>{errorText}</Typography>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Divider sx={{ mt: 2 }} variant="middle" />
                      <Grid item>
                        <SpaceBetweenGrid sx={{ mx: 3 }}>
                          <Grid container spacing={3}>
                            <Grid item md={4} xs={12}>
                              <Typography
                                variant="h6"
                                sx={{ marginTop: 2, fontWeight: "bold" }}
                              >
                                Sensor status
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              md={8}
                              sm={12}
                              xs={12}
                              sx={{ alignSelf: "center", mt: 1 }}
                            >
                              Define the status for the sensor
                            </Grid>
                          </Grid>
                          <Grid>
                            <Typography>Active</Typography>
                            <Field
                              as={Checkbox}
                              type="checkbox"
                              name="active"
                            />
                          </Grid>
                        </SpaceBetweenGrid>
                      </Grid>
                      <Divider sx={{ mt: 2 }} variant="middle" />
                      <Grid>
                        <Typography
                          variant="h6"
                          fontWeight={"bold"}
                          textAlign={"center"}
                          sx={{ my: 4 }}
                        >
                          Measurements
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight={"bold"}
                          textAlign={"center"}
                          sx={{ my: 4 }}
                        >
                          Define the types of measurements for the sensor by
                          selecting them
                        </Typography>
                        <FormGroup
                          row
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Field
                                name="measurementsType"
                                type="checkbox"
                                value="PM25"
                                as={Switch}
                              />
                            }
                            label="PM 2.5"
                            labelPlacement="top"
                            defaultChecked
                          />
                          <FormControlLabel
                            control={
                              <Field
                                name="measurementsType"
                                type="checkbox"
                                value="PM10"
                                as={Switch}
                              />
                            }
                            label="PM 10"
                            labelPlacement="top"
                            defaultChecked
                          />
                          <FormControlLabel
                            control={
                              <Field
                                name="measurementsType"
                                type="checkbox"
                                value="NO2"
                                as={Switch}
                              />
                            }
                            label="NO2"
                            labelPlacement="top"
                          />
                          <FormControlLabel
                            control={
                              <Field
                                name="measurementsType"
                                type="checkbox"
                                value="O3"
                                as={Switch}
                              />
                            }
                            label="O3"
                            labelPlacement="top"
                            defaultChecked
                          />
                          <FormControlLabel
                            control={
                              <Field
                                name="measurementsType"
                                type="checkbox"
                                value="SO2"
                                as={Switch}
                              />
                            }
                            label="SO2"
                            labelPlacement="top"
                            defaultChecked
                          />
                          <FormControlLabel
                            control={
                              <Field
                                name="measurementsType"
                                type="checkbox"
                                value="temp"
                                as={Switch}
                              />
                            }
                            label="Temperature"
                            labelPlacement="top"
                            defaultChecked
                          />
                          <FormControlLabel
                            control={
                              <Field
                                name="measurementsType"
                                type="checkbox"
                                value="humidity"
                                as={Switch}
                              />
                            }
                            label="Humidity"
                            labelPlacement="top"
                            defaultChecked
                          />
                          <FormControlLabel
                            control={
                              <Field
                                name="measurementsType"
                                type="checkbox"
                                value="pressure"
                                as={Switch}
                              />
                            }
                            label="Pressure"
                            labelPlacement="top"
                            defaultChecked
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 2,
                          }}
                        >
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="contained"
                            sx={{ height: 50 }}
                          >
                            Add Sensor
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
          <Snackbar
            open={snackbar}
            message={snackbarFeedback}
            onClose={handleCloseSnackbar}
            autoHideDuration={2000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          />
        </Container>
      </div>
    </div>
  );
};
