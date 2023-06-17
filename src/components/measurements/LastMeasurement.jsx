import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import {
  RowDirectionFormGrid,
  StyledPaper,
  TypographyHealthKitAndDate,
} from "styledComponentsAPI/Component";
import CircularProgress from "@mui/material/CircularProgress";
import { format } from "date-fns";

export const LastMeasurement = (props) => {
  const [measurements, setMeasurements] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchLastMeasurementByType = () => {
      axios
        .get("http://localhost:8080/api/sensor/measurement/latestTimestamp", {
          headers: {
            sensorUUID: props.sensorUUID,
          },
        })
        .then((response) => {
          console.log("last hourly measurements", response.data);
          setMeasurements(response.data);
          // valuesArray.push(response.data.value);
          // setMeasurementUnit(processUnit(response.data.unit));
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
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={40} />
        </Grid>
      ) : (
        <>
          {measurements ? (
            <>
              <Typography
                sx={{
                  fontFamily: '"Nunito Sans",sans-serif',
                  fontWeight: 700,
                  fontSize: 15,
                  lineHeight: "18px",
                  color: "#a2a8af",
                  mb: 0.5,
                }}
                textAlign={"center"}
              >
                {measurements[0].instantTime
                  ? format(
                      new Date(measurements[0].instantTime.seconds * 1000),
                      "d MMMM yyyy hh:mm aa"
                    )
                  : ""}
              </Typography>
              <RowDirectionFormGrid>
                {measurements.map((measurement) => (
                  <StyledPaper
                    elevation={4}
                    sx={{ backgroundColor: "#15aefa" }}
                  >
                    <>
                      <Typography
                        fontWeight={"bold"}
                        textAlign={"center"}
                        fontSize={16}
                      >
                        {measurement.type.toUpperCase()}
                      </Typography>
                      <RowDirectionFormGrid sx={{ columnGap: 1 }}>
                        <Typography fontSize={17}>
                          {measurement.value}
                        </Typography>
                        <Typography fontSize={14} sx={{ alignSelf: "end" }}>
                          {processUnit(measurement.unit)}
                        </Typography>
                      </RowDirectionFormGrid>
                    </>
                  </StyledPaper>
                ))}
              </RowDirectionFormGrid>
            </>
          ) : (
            <Typography
              sx={{
                fontFamily: '"Nunito Sans",sans-serif',
                fontWeight: 700,
                fontSize: 15,
                lineHeight: "18px",
                color: "#a2a8af",
                mb: 0.5,
              }}
              textAlign={"center"}
            >
              No measurements data
            </Typography>
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
  if (unit === "HECTOPASCALS") unit = "hPa";
  return unit;
};
