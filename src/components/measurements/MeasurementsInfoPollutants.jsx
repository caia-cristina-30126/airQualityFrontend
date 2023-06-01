import { Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";
import { formatData } from "util/formatDataHighcharts";
import format from "date-fns/format";

export const MeasurementsInfoPollutants = (props) => {
  const [lastWeekMeasurements, setLastWeekMeasurement] = useState([]);
  const [timestamp, setTimestamp] = useState(null);

  useEffect(() => {
    const fetchLastWeekMeasurements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/sensor/measurement/lastWeek",
          {
            headers: {
              sensorUUID: props.sensorUUID,
              measurementType: props.measurementType,
            },
          }
        );
        console.log("pollutants for aqi", response.data);
        setLastWeekMeasurement(response.data);
        setTimestamp(
          response.data[lastWeekMeasurements.length].instantTime.seconds
        );
      } catch (error) {
        console.error("Error retrieving last week measurements:", error);
      }
    };

    fetchLastWeekMeasurements();
  }, []);

  const chartOptions = (data, color) => ({
    title: {
      text: props.measurementType,
    },

    chart: {
      type: "line",
      width: 300,
      height: 120,
      borderRadius: 5,
    },

    series: [
      {
        data: formatData(data, color),
      },
    ],

    xAxis: {
      visible: false,
      labels: {
        enabled: false,
      },
    },

    yAxis: {
      title: {
        text: "µg/m³",
      },
    },

    legend: {
      enabled: false,
    },
    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: false,
    },
    tooltip: {
      headerFormat: "<b>{hey}</b><br>",
      pointFormat: "{point.y}",
    },
    lang: {
      noData: "No data",
    },
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "12px",
        color: "#303030",
      },
    },
  });
  // console.log("date", format(new Date(timestamp * 1000), "d MMMM yyyy"));
  const values = lastWeekMeasurements.map((obj) => obj.value);
  console.log("plo values", values.reverse());
  return (
    <Grid sx={{ justifyContent: "center", p: 3 }}>
      {/*  {lastWeekMeasurements.map((timestamp) => (
        <Typography sx={{ fontSize: 12 }} fontWeight={"bold"}>
          {timestamp.instantTime.seconds
            ? format(
                new Date(timestamp.instantTime.seconds * 1000),
                "d MMMM yyyy"
              )
            : ""}
        </Typography>
      ))} */}

      <Typography sx={{ fontSize: 12 }} fontWeight={"bold"}>
        {timestamp ? format(new Date(timestamp * 1000), "d MMMM yyyy") : ""}
      </Typography>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions(values, "#abe496")}
      />
    </Grid>
  );
};
