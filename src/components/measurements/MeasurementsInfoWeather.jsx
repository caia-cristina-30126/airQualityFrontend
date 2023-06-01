import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import { formatData } from "util/formatDataHighcharts";

export const MeasurementsInfoWeather = (props) => {
  const [lastWeekMeasurements, setLastWeekMeasurement] = useState([]);

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
        setLastWeekMeasurement(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error retrieving last week measurements:", error);
      }
    };

    fetchLastWeekMeasurements();
  }, []);

  if (typeof Highcharts === "object") {
    NoDataToDisplay(Highcharts);
  }
  const chartOptions = (data, color) => ({
    title: {
      text: formatNameType(props.measurementType),
    },
    series: [
      {
        data: formatData(data, color),
      },
    ],
    chart: {
      type: "column",
      width: 300,
      height: 120,
      borderRadius: 5,
    },

    xAxis: {
      visible: false,
      labels: {
        enabled: false,
      },
    },
    yAxis: {
      title: {
        text: "",
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

  const values = lastWeekMeasurements.map((obj) => obj.value);
  console.log("wather values", values.reverse());

  return (
    <Grid sx={{ justifyContent: "center", p: 3 }}>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions(values, "#ee9b98")}
      />
    </Grid>
  );
};

const formatNameType = (name) => {
  if (name === "temp") return "Temperature";
  return name.charAt(0).toUpperCase() + name.slice(1);
};
