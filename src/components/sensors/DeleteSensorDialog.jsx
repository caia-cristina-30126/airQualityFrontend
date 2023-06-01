import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import axios from 'axios';
import DeleteIcon from "@mui/icons-material/Delete";

export const DeleteSensorDialog = (props) => {
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


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
  <>
  <IconButton onClick={handleClickOpen}>
                      <DeleteIcon />
                    </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete sensor {props.sensorName}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this sensor?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => handleDeleteSensor(props.uuid)} autoFocus color='error'>
              Delete sensor
            </Button>
          </DialogActions>
        </Dialog>
        </>
    );
  };