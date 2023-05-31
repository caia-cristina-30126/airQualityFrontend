import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Sidebar } from "./sidebar/Sidebar";

export const SensorsTableContent = () => {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/sensor/list"
        );
        setSensors(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error retrieving sensors:", error);
      }
    };

    fetchSensors();
  }, []);

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
      window.location.reload();
    } catch (error) {
      console.error("Error deleting sensor:", error);
    }
  };

  return (
    <Grid container sx={{ display: "flex" }}>
      <Grid item md={2.2}>
        <Sidebar />
      </Grid>

      <Grid
        item
        xs={12}
        md={9.5}
        sx={{
          mt: 9,
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sensor UUID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Creation date</TableCell>

                {/* Add more table headers for other properties */}
              </TableRow>
            </TableHead>
            <TableBody>
              {sensors.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.uuid}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.lastUpdate}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteSensor(item.uuid)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
