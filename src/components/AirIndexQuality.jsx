import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import { RowDirectionFormGrid } from "styledComponentsAPI/Component";
import CircularProgress from "@mui/material/CircularProgress";
import { format } from "date-fns";
import { SeverityPill } from "icons/severity-pill";

export const AirIndexQuality = (props) => {
  const [timestamp, setTimestamp] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [aqi, setAqi] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchAQI = () => {
      axios
        .get("http://localhost:8080/api/aqi", {
          headers: {
            sensorUUID: props.sensorUUID,
          },
        })
        .then((response) => {
          console.log("aiq with type object ", response.data);
          setAqi(processAQI(response.data.value, response.data.type));

          setFeedback(feedbackAQI(response.data.value, response.data.type));
          setIsLoading(false);
        })
        .catch((error) => {
          alert(error);
          setIsLoading(false);
        });
    };

    const fetchLastMeasurementByType = () => {
      axios
        .get("http://localhost:8080/api/sensor/measurement/last", {
          headers: {
            sensorUUID: props.sensorUUID,
            measurementType: props.measurementType,
          },
        })
        .then((response) => {
          console.log(response.data);
          setTimestamp(response.data.instantTime.seconds);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    };

    fetchAQI();
    fetchLastMeasurementByType();
  }, []);

  return (
    <Grid sx={{ p: 1 }}>
      {isLoading ? (
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={20} />
        </Grid>
      ) : (
        <>
          <RowDirectionFormGrid
            sx={{
              display: "flex",
              justifyContent: "center",

              columnGap: 1.5,
            }}
          >
            <SeverityPill color={feedback}> {feedback} </SeverityPill>
            <Typography sx={{ fontSize: 14 }} fontWeight={"bold"}>
              {aqi}
            </Typography>
          </RowDirectionFormGrid>
          <Typography
            sx={{
              fontFamily: '"Nunito Sans",sans-serif',
              fontWeight: 700,
              fontSize: 15,
              lineHeight: "18px",
              color: "#a2a8af",
              my: 0.5,
            }}
            textAlign={"center"}
          >
            {timestamp
              ? format(new Date(timestamp * 1000), "d MMMM yyyy hh:mm aa")
              : ""}
          </Typography>
        </>
      )}
    </Grid>
  );
};

const processAQI = (aqiValue, aqiType) => {
  if (
    aqiValue === Number.NEGATIVE_INFINITY ||
    !isFinite(aqiValue) ||
    aqiType === ""
  ) {
    return <></>;
  } else {
    return (
      <Grid>
        <Typography fontSize={17} fontWeight={"bold"}>
          {aqiValue}
        </Typography>
        ( based on {aqiType} )
      </Grid>
    );
  }
};

export const intervalUpperBoundsByType = {
  PM25: [10, 20, 25, 50, 75, 800],
  PM10: [20, 40, 50, 100, 150, 1200],
  NO2: [40, 90, 120, 230, 340, 1000],
  O3: [50, 100, 130, 240, 380, 800],
  SO2: [100, 200, 350, 500, 750, 1250],
};
export const feedbackTable = [
  "Good",
  "Fair",
  "Moderate",
  "Poor",
  "Very poor",
  "Extremely poor",
];

export const feedbackAQI = (value, type) => {
  const intervalUpperBounds = intervalUpperBoundsByType[type];

  if (intervalUpperBounds) {
    for (let i = 0; i < feedbackTable.length; i++) {
      if (value <= intervalUpperBounds[i]) {
        return feedbackTable[i];
      }
    }
  }
  return "No data";
};
