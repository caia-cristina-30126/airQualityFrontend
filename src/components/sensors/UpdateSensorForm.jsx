import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { Box, Button, Card, CardContent, Checkbox, Grid, TextField, Typography } from '@mui/material';

const UpdateSensorForm = (props) => {
  const handleSubmit = async (values) => {
    const { active, name, latitude, longitude } = values;

    const sensorData = {
    uuid: props.uuid,
      active: active,
      name: name,
      location: {
        latitude: latitude,
        longitude: longitude,
      },
    };

    try {
      const response = await axios.put(`http://localhost:8080/api/updateSensor`, sensorData);

      if (response.status === 200) {
        // Sensor update successful, handle success case
        console.log('Sensor updated successfully');
      } else {
        // Sensor update failed, handle error case
        console.error('Failed to update sensor');
      }
    } catch (error) {
      console.error('Error updating sensor:', error);
    }
  };

  return (
    <>
    {console.log("sensorrr uuid: ", props.uuid)}
    <Card>
        <CardContent>
          <Formik
      initialValues={{
        active: false,
        name: '',
        location: {
          latitude: 2,
          longitude: null,
        },
      }}
      onSubmit={handleSubmit}
    >
       <Form>
        <Grid container spacing={2} sx={{display:'flex', flexFlow:'column'}} >
       
        <Grid item>
            <Typography>Active</Typography>
        <Field as={Checkbox} label="Active" name="active"/>
        </Grid>
        <Grid item>
        <Field as={TextField} label="Name" name="name"  fullWidth/>
        </Grid>
        <Grid item>
        <Field as={TextField} label="Latitude" name="latitude" type="number"  fullWidth/>
        </Grid>
        <Grid item>
        <Field as={TextField} label="Longitude" name="longitude" type="number"fullWidth />
        </Grid>
        <Button type="submit">Update Sensor</Button>
        </Grid>
      </Form>
    </Formik>
    </CardContent>
    </Card>
         
     
  
   
    </>
  );
};

export default UpdateSensorForm;
