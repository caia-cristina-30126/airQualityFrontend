import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { SpaceBetweenGrid } from "styledComponentsAPI/Component";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { UpdateForm } from "util/UpdateForm";

const UpdateSensorForm = ({ uuid }) => {
  const [sensorData, setSensorData] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState(false);
  const [snackbarFeedback, setsnackbarFeedback] = React.useState("");
  const allMeasurementsTypes = [
    "PM25",
    "PM10",
    "NO2",
    "O3",
    "SO2",
    "temp",
    "humidity",
    "pressure",
  ];
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const handleDeleteSensor = async (uuid) => {
    try {
      const config = {
        headers: {
          UUID: uuid,
        },
      };

      const response = await axios.delete(
        "http://localhost:8080/api/deleteSensorByUUID",
        config
      );

      console.log("Sensor deleted successfully:", response);
      navigate("/sensors");
    } catch (error) {
      console.error("Error deleting sensor:", error);
    }
  };

  React.useEffect(() => {
    const fetchSensor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/getSensorByUUID`,
          {
            headers: { UUID: uuid },
          }
        );
        setSensorData(response.data);
      } catch (error) {
        console.error("Error fetching sensor:", error);
      }
    };

    fetchSensor();
  }, [uuid]);

  if (!sensorData) {
    return <CircularProgress size={20} />;
  }

  const handleSubmit = async (values) => {
    const { active, name, latitude, longitude, measurementsType } = values;

    const sensorData = {
      uuid: uuid,
      active: active,
      name: name,
      location: {
        latitude: latitude,
        longitude: longitude,
      },
      measurementsType: measurementsType,
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/updateSensor`,
        sensorData
      );

      if (response.status === 200) {
        setsnackbarFeedback("Sensor updated successfully!");
        setSnackbar(true);
      } else {
        setsnackbarFeedback("Error updating sensor");
        setSnackbar(true);
      }
    } catch (error) {
      console.error("Error updating sensor:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 3 }} fontWeight={"bold"}>
        Sensor details
      </Typography>
      <Card sx={{ p: 2, backgroundColor: "#f5f5f0" }}>
        <CardContent>
          <Formik
            initialValues={{
              active: sensorData.active,
              name: sensorData.name,
              location: {
                latitude: sensorData.location.latitude,
                longitude: sensorData.location.longitude,
              },
              measurementsType: sensorData.measurementsType,
            }}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange }) => (
              <Form>
                <UpdateForm
                  title="Basic details"
                  content={
                    <Field
                      as={TextField}
                      label="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      fullWidth
                      sx={{ my: 2 }}
                      InputLabelProps={{ shrink: true }}
                    />
                  }
                />
                <Divider sx={{ mt: 2, mb: 2 }} />
                <UpdateForm
                  title="Location"
                  content={
                    <>
                      <Field
                        as={TextField}
                        label="Latitude"
                        name="latitude"
                        type="number"
                        value={values.location.latitude}
                        disabled
                        fullWidth
                        sx={{ my: 2 }}
                      />
                      <Field
                        as={TextField}
                        label="Longitude"
                        name="longitude"
                        type="number"
                        value={values.location.longitude}
                        disabled
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
                  <Divider sx={{ mt: 4 }} />
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
                          label="Active"
                          name="active"
                          checked={values.active}
                          onChange={handleChange}
                          color="success"
                        />
                      </Grid>
                    </SpaceBetweenGrid>
                  </Grid>
                  <Divider sx={{ mt: 2 }} />
                  <Grid item>
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
                      Types of measurements for the sensor
                    </Typography>
                    <FieldArray name="measurementsType">
                      {({ remove, push }) => (
                        <FormGroup
                          row
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {allMeasurementsTypes?.map((type, index) => (
                            <FormControlLabel
                              key={index}
                              control={
                                <Switch
                                  checked={values.measurementsType.includes(
                                    type
                                  )}
                                  color="error"
                                  onChange={(event) => {
                                    const isChecked = event.target.checked;
                                    const typeIndex =
                                      values.measurementsType.indexOf(type);
                                    if (isChecked && typeIndex === -1) {
                                      push(type);
                                    } else if (!isChecked && typeIndex !== -1) {
                                      remove(typeIndex);
                                    }
                                  }}
                                  name={`measurementsType.${index}`}
                                  value={type}
                                  disabled
                                />
                              }
                              label={type}
                            />
                          ))}
                        </FormGroup>
                      )}
                    </FieldArray>
                  </Grid>
                  <Divider sx={{ mt: 3 }} />
                  <Grid item xs={12}>
                    <Grid
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 1,
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          height: 50,
                          backgroundColor: "#0384f3",
                          fontWeight: "bold",
                        }}
                      >
                        Update sensor
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
          <Divider sx={{ mt: 2 }} />

          <Grid item>
            <SpaceBetweenGrid sx={{ mx: 3, mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                  <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                    Delete sensor
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={8}
                  sm={12}
                  xs={12}
                  sx={{ alignSelf: "center", mt: 2 }}
                >
                  Delete this sensor and all of its data?
                </Grid>
              </Grid>
              <Grid>
                <Button
                  onClick={handleClickOpen}
                  color="error"
                  type="submit"
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  sx={{ mt: 2 }}
                >
                  Delete
                </Button>
              </Grid>
            </SpaceBetweenGrid>
          </Grid>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete sensor {sensorData.sensorName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this sensor?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => handleDeleteSensor(sensorData.uuid)}
            autoFocus
            color="error"
          >
            Delete sensor
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar}
        message={snackbarFeedback}
        onClose={handleCloseSnackbar}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Container>
  );
};

export default UpdateSensorForm;
