import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Sidebar } from "components/sidebar/Sidebar";
import React, { useState } from "react";
import "firebase/firestore";

export const AddSensorContent = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = React.useState({
    gilad: true,
    jason: true,
    antoine: false,
  });
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  return (
    <Grid container sx={{ display: "flex" }}>
      <Grid item md={2}>
        <Sidebar />
      </Grid>

      <Grid
        item
        xs={12}
        md={9.9}
        sx={{
          mt: 7,
        }}
      >
        <Box sx={{ mt: 4 }}>
          <Card>
            <CardContent>
              <TextField
                fullWidth
                label="Name"
                name="sensorName"
                required
                placeholder="Sensor name"
              />

              <TextField
                fullWidth
                name="Location"
                label="Sensor Location"
                required
                placeholder="Sensor Location"
                sx={{ mt: 2 }}
              />
              <Divider sx={{ mt: 2 }} />
              <Grid>
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  textAlign={"center"}
                  sx={{ mt: 2 }}
                >
                  Measurements{" "}
                </Typography>
                <Box sx={{ display: "flex" }}>
                  <FormControl
                    sx={{ m: 3 }}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">Types</FormLabel>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked={true}
                            //checked={true}
                            onChange={handleChange}
                            name="gilad"
                          />
                        }
                        label="Gilad Gray"
                        sx={{ marginRight: 2 }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked={true}
                            //  checked={true}
                            onChange={handleChange}
                            name="jason"
                          />
                        }
                        label="Jason Killian"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked={true}
                            // checked={true}
                            onChange={handleChange}
                            name="antoine"
                          />
                        }
                        label="Antoine Llorca"
                      />
                    </FormGroup>
                  </FormControl>
                </Box>
              </Grid>
            </CardContent>
          </Card>
          <Grid sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button type="submit" variant="contained" sx={{ height: 50 }}>
              Add Sensor
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
