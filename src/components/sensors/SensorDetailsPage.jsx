import React, { useState } from "react";
import { TextField, Checkbox, Button } from "@mui/material";
import axios from "axios";
import { Sidebar } from "components/sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import UpdateSensorForm from "./UpdateSensorForm";
export const SensorDetailsPage = (props) => {
  const location = useLocation();
  const getUuidFromParams = new URLSearchParams(location.search);
  const sensorUUID = getUuidFromParams.get("sensorUUID");
  

  return (
    <div style={{ display: "flex", margin: "20px" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, marginTop: "72px" }}>
    <UpdateSensorForm  uuid ={sensorUUID}/>
      </div>
    </div>
  );
};
