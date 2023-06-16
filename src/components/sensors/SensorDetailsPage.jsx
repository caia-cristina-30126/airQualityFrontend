import React from "react";
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
      <div style={{ flexGrow: 1, marginTop: "40px" }}>
        <UpdateSensorForm uuid={sensorUUID} />
      </div>
    </div>
  );
};
