import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { Button, Card, CardContent, Checkbox, CircularProgress,Grid, TextField, Typography } from '@mui/material';

const UpdateSensorForm = ({uuid}) => {
  const [sensorData, setSensorData] = React.useState(null);

React.useEffect(() => {
  const fetchSensor = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/getSensorByUUID`, {
        headers: { UUID: uuid }
      });
      setSensorData(response.data);
    } catch (error) {
      console.error('Error fetching sensor:', error);
    }
  };

  fetchSensor();
}, [uuid]);
if (!sensorData) {
  return <CircularProgress size={20} />;
}

  const handleSubmit = async (values) => {
    const { active, name, latitude, longitude } = values;

    const sensorData = {
    uuid: uuid,
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
    <Typography variant='h4' sx={{mb:3}}>{sensorData.name} details</Typography>
    <Card>
        <CardContent>
          <Formik
      initialValues={{
        active: sensorData.active,
        name: sensorData.name,
        location: {
          latitude: sensorData.location.latitude,
          longitude:sensorData.location.longitude,
        },
      }}
      onSubmit={handleSubmit}
    >
       {({initialValues, values, handleChange }) => (
             <Form>
        <Grid container spacing={2} sx={{display:'flex', flexFlow:'column'}} >
       
        <Grid item>
            <Typography>Active</Typography>
        <Field as={Checkbox} label="Active" name="active"  checked={values.active}
                      onChange={handleChange}/>
        </Grid>
        <Grid item>
        <Field as={TextField} label="Name" name="name"     value={values.name}
                      onChange={handleChange} fullWidth/>
        </Grid>
        <Grid item>
        {/*   <Grid sx={{display:'flex', flexDirection:'row', columnGap:5, }}>
        <Typography variant="h6">Latitude: {sensorData.location.latitude}</Typography>
        <Typography variant="h6">Longitude: {sensorData.location.longitude}</Typography>
        </Grid> */}
        <Field as={TextField} label="Latitude" name="latitude" type="number"
                   value={values.location.latitude} disabled fullWidth/>
        </Grid>
        <Grid item>
        <Field as={TextField} label="Longitude" name="longitude" type="number"
                   value={values.location.longitude} disabled  fullWidth />
        </Grid>
        <Button type="submit" variant='contained' sx={{mt:3}}>Update Sensor</Button>
        </Grid>
      </Form>
     
    
       )}
    </Formik>
    </CardContent>
    </Card>  
   
   </>
  );
};

export default UpdateSensorForm;
