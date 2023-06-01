import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import {
  RowDirectionFormGrid,
  StyledPaper,
} from "styledComponentsAPI/Component";
import CircularProgress from "@mui/material/CircularProgress";

export const LastMeasurement = (props) => {
  //  const [measurementType, setMeasurementType] = useState("");
  const [measurementValue, setMeasurementValue] = useState("");
  const [measurementUnit, setMeasurementUnit] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLastMeasurementByType = () => {
      axios
        .get("http://localhost:8080/api/sensor/measurement/last", {
          headers: {
            sensorUUID: props.sensorUUID,
            measurementType: props.measurementType,
          },
        })
        .then((response) => {
          console.log("pollutants caqi", response.data.value);
          setMeasurementValue(processValue(response.data.value));
          setMeasurementUnit(processUnit(response.data.unit));
          setIsLoading(false);
        })
        .catch((error) => {
          alert(error);
          setIsLoading(false);
        });
    };

    fetchLastMeasurementByType();
  }, []);

 
  return (
    <StyledPaper elevation={4}>
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <>
          <Grid>{props.measurementType}</Grid>
          <RowDirectionFormGrid>
            <Grid>{measurementValue}</Grid>
            <Grid>{measurementUnit}</Grid>
          </RowDirectionFormGrid>
        </>
      )}
    </StyledPaper>
  );
};

const processValue = (value) => {
  if (!value) return "";
  return value;
};

const processUnit = (unit) => {
  if (!unit) return ".";
  if (unit === "MICROGRAMS_PER_CUBIC_METER") unit = "µg/m³";
  if (unit === "PARTS_PER_BILLION") unit = "µg/m³";
  if (unit === "PERCENT") unit = "%";
  if (unit === "CELSIUS_DEGREE") unit = "°C";
  return unit;
};
