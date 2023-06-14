import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import {
  RowDirectionFormGrid,
  StyledPaper,
} from "styledComponentsAPI/Component";
import CircularProgress from "@mui/material/CircularProgress";

export const LastMeasurement = (props) => {
  const [measurementValue, setMeasurementValue] = useState("");
  const [measurementUnit, setMeasurementUnit] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDefined, setIsDefined] = useState(false);
  const valuesArray = [];
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
          setMeasurementValue(response.data.value);

          valuesArray.push(response.data.value);
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
    <>
      {isLoading ? (
        <CircularProgress size={40} />
      ) : (
        <>
          {measurementValue && measurementUnit ? (
            <>
              <StyledPaper elevation={4} sx={{ backgroundColor: "#71DEF1" }}>
                <>
                  <Typography
                    fontWeight={"bold"}
                    textAlign={"center"}
                    fontSize={18}
                  >
                    {props.measurementType.toUpperCase()}
                  </Typography>
                  <RowDirectionFormGrid sx={{ columnGap: 1 }}>
                    <Typography fontSize={20}>{measurementValue}</Typography>
                    <Typography fontSize={16} sx={{ alignSelf: "end" }}>
                      {measurementUnit}
                    </Typography>
                  </RowDirectionFormGrid>
                </>
              </StyledPaper>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

const processUnit = (unit) => {
  if (!unit) return;
  if (unit === "MICROGRAMS_PER_CUBIC_METER") unit = "µg/m³";
  if (unit === "PARTS_PER_BILLION") unit = "µg/m³";
  if (unit === "PERCENT") unit = "%";
  if (unit === "CELSIUS_DEGREE") unit = "°C";
  return unit;
};
