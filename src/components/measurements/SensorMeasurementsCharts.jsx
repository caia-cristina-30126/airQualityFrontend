import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router-dom";
import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";
import { formatData } from "util/formatDataHighcharts";
import {
  KPITitleTypography,
  KPITypography,
  ParentPaper,
  RowDirectionFormGrid,
  SpaceBetweenGrid,
  TypographyHealthKitAndDate,
} from "styledComponentsAPI/Component";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import { Sidebar } from "components/sidebar/Sidebar";

export const SensorMeasurementsCharts = (props) => {
  const location = useLocation();
  const [pm25, setPM25] = useState([]);
  const [pm10, setPM10] = useState([]);
  const [no2, setNO2] = useState([]);
  const [o3, setO3] = useState([]);
  const [so2, setSO2] = useState([]);
  const [temp, setTemp] = useState([]);
  const [pressure, setPressure] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const measurementsTypes = [
    "PM25",
    "PM10",
    "NO2",
    "O3",
    "SO2",
    "temp",
    "humidity",
    "pressure",
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  const pollutantsUnit = "µg/m³";
  useEffect(() => {
    const getUuidFromParams = new URLSearchParams(location.search);
    const sensorUUID = getUuidFromParams.get("sensorUUID");

    const fetchLastWeekMeasurements = async () => {
      try {
        const dataArr = [];
        for (const type of measurementsTypes) {
          const configHeader = {
            headers: {
              sensorUUID: sensorUUID,
              measurementType: type,
            },
          };

          const response = await axios.get(
            "http://localhost:8080/api/sensor/measurement/lastWeek",
            configHeader
          );

          if (type === "PM25") {
            setPM25(response.data);
          } else if (type === "PM10") {
            setPM10(response.data);
          } else if (type === "NO2") {
            setNO2(response.data);
          } else if (type === "O3") {
            setO3(response.data);
          } else if (type === "SO2") {
            setSO2(response.data);
          } else if (type === "temp") {
            setTemp(response.data);
          } else if (type === "pressure") {
            setPressure(response.data);
          } else if (type === "humidity") {
            setHumidity(response.data);
          }
          setIsLoading(false);
          console.log("sensor measurements charts pollutants", response.data);
          dataArr.push({
            type,
            data: response.data,
          });
        }

        setChartData(dataArr);
        console.log("all the datas", chartData);
      } catch (error) {
        console.error(
          "Error retrieving last week measurements FOR pollutants CHARTS :",
          error
        );
        setIsLoading(false);
      }
    };

    fetchLastWeekMeasurements();
  }, []);

  if (typeof Highcharts === "object") {
    NoDataToDisplay(Highcharts);
  }

  const chartOptions = (data, color, chartType, unit) => ({
    title: {
      text: "",
    },

    chart: {
      type: chartType,
      width: 400,
      height: 220,
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
        text: unit,
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
      noData: "No pollutant data",
    },
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "12px",
        color: "#303030",
      },
    },
  });

  const pm25Values = pm25.map((obj) => obj.value);
  const pm10Values = pm10.map((obj) => obj.value);
  const no2Values = no2.map((obj) => obj.value);
  const o3Values = o3.map((obj) => obj.value);
  const so2Values = so2.map((obj) => obj.value);
  const tempValues = temp.map((obj) => obj.value);
  const pressureValues = pressure.map((obj) => obj.value);
  const humidityValues = humidity.map((obj) => obj.value);

  /*  const lastDateTimestamp = (seconds) => {
    return (
      <Typography sx={{ fontSize: 12 }} fontWeight={"bold"}>
        {seconds ? format(new Date(seconds * 1000), "d MMMM yyyy") : "-"}
      </Typography>
    );
  }; */

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, marginTop: "72px" }}>
        <Typography
          variant="h4"
          fontWeight={"bold"}
          textAlign={"center"}
          sx={{ mb: 5 }}
        >
          Measurements charts
        </Typography>
        <Container maxWidth="xl">
          <RowDirectionFormGrid sx={{ justifyContent: "center", p: 3 }}>
            {isLoading ? (
              <CircularProgress size={20} />
            ) : (
              <>
                <Grid container spacing={5}>
                  <Grid item>
                    <ParentPaper>
                      <SpaceBetweenGrid marginBottom={1}>
                        <KPITitleTypography>PM2.5</KPITitleTypography>
                        <TypographyHealthKitAndDate>
                          Pollutant concentration
                        </TypographyHealthKitAndDate>
                      </SpaceBetweenGrid>
                      <SpaceBetweenGrid marginBottom={1}>
                        <KPITypography color={"blue"}>Daily</KPITypography>
                        <TypographyHealthKitAndDate></TypographyHealthKitAndDate>
                      </SpaceBetweenGrid>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions(
                          pm25Values.reverse(),
                          "#abe496",
                          "line",
                          pollutantsUnit
                        )}
                      />
                    </ParentPaper>
                  </Grid>
                  <Grid item>
                    <ParentPaper>
                      <SpaceBetweenGrid marginBottom={1}>
                        <KPITitleTypography>PM10</KPITitleTypography>
                        <TypographyHealthKitAndDate>
                          Pollutant concentration
                        </TypographyHealthKitAndDate>
                      </SpaceBetweenGrid>
                      <SpaceBetweenGrid marginBottom={1}>
                        <KPITypography color={"blue"}>Daily</KPITypography>
                        <TypographyHealthKitAndDate></TypographyHealthKitAndDate>
                      </SpaceBetweenGrid>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions(
                          pm10Values.reverse(),
                          "#abe496",
                          "line",
                          pollutantsUnit
                        )}
                      />
                    </ParentPaper>
                  </Grid>
                  <Grid item>
                    <ParentPaper>
                      <SpaceBetweenGrid marginBottom={1}>
                        <KPITitleTypography>NO2</KPITitleTypography>
                        <TypographyHealthKitAndDate>
                          Pollutant concentration
                        </TypographyHealthKitAndDate>
                      </SpaceBetweenGrid>
                      <SpaceBetweenGrid marginBottom={1}>
                        <KPITypography color={"blue"}>Daily</KPITypography>
                        <TypographyHealthKitAndDate></TypographyHealthKitAndDate>
                      </SpaceBetweenGrid>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions(
                          no2Values.reverse(),
                          "#abe496",
                          "line",
                          pollutantsUnit
                        )}
                      />
                    </ParentPaper>
                  </Grid>
                  <Grid item>
                    <ParentPaper>
                      <SpaceBetweenGrid marginBottom={1}>
                        <KPITitleTypography>O3</KPITitleTypography>
                        <TypographyHealthKitAndDate>
                          Pollutant concentration
                        </TypographyHealthKitAndDate>
                      </SpaceBetweenGrid>
                      <SpaceBetweenGrid marginBottom={1}>
                        <KPITypography color={"blue"}>Daily</KPITypography>
                        <TypographyHealthKitAndDate></TypographyHealthKitAndDate>
                      </SpaceBetweenGrid>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions(
                          o3Values.reverse(),
                          "#abe496",
                          "line",
                          pollutantsUnit
                        )}
                      />
                    </ParentPaper>
                  </Grid>
                  <Grid item>
                    <ParentPaper>
                      <SpaceBetweenGrid marginBottom={1}>
                        <KPITitleTypography>SO2</KPITitleTypography>
                        <TypographyHealthKitAndDate>
                          Pollutant concentration
                        </TypographyHealthKitAndDate>
                      </SpaceBetweenGrid>
                      <SpaceBetweenGrid marginBottom={1}>
                        <KPITypography color={"blue"}>Daily</KPITypography>
                      </SpaceBetweenGrid>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions(
                          so2Values.reverse(),
                          "#abe496",
                          "line",
                          pollutantsUnit
                        )}
                      />
                    </ParentPaper>
                  </Grid>
                  <Grid item>
                    <ParentPaper>
                      <SpaceBetweenGrid marginBottom={1}>
                        <KPITitleTypography>Temperature</KPITitleTypography>
                        <TypographyHealthKitAndDate>
                          Weather data
                        </TypographyHealthKitAndDate>
                      </SpaceBetweenGrid>
                      <SpaceBetweenGrid marginBottom={1}>
                        <KPITypography color={"blue"}>Daily</KPITypography>
                      </SpaceBetweenGrid>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions(
                          tempValues.reverse(),
                          "#abe496",
                          "column",
                          "°C"
                        )}
                      />
                    </ParentPaper>
                  </Grid>
                  <Grid item>
                    <ParentPaper>
                      <SpaceBetweenGrid marginBottom={1}>
                        <KPITitleTypography>Pressure</KPITitleTypography>
                        <TypographyHealthKitAndDate>
                          Weather data
                        </TypographyHealthKitAndDate>
                      </SpaceBetweenGrid>
                      <SpaceBetweenGrid marginBottom={1}>
                        <KPITypography color={"blue"}>Daily</KPITypography>
                      </SpaceBetweenGrid>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions(
                          pressureValues.reverse(),
                          "#abe496",
                          "column",
                          "hPa"
                        )}
                      />
                    </ParentPaper>
                  </Grid>
                  <Grid item>
                    <ParentPaper>
                      <SpaceBetweenGrid marginBottom={1}>
                        <KPITitleTypography>Humidity</KPITitleTypography>
                        <TypographyHealthKitAndDate>
                          Weather data
                        </TypographyHealthKitAndDate>
                      </SpaceBetweenGrid>
                      <SpaceBetweenGrid marginBottom={1}>
                        <KPITypography color={"blue"}>Daily</KPITypography>
                      </SpaceBetweenGrid>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions(
                          humidityValues.reverse(),
                          "#abe496",
                          "column",
                          "%"
                        )}
                      />
                    </ParentPaper>
                  </Grid>
                </Grid>
              </>
            )}
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
          </RowDirectionFormGrid>
        </Container>
      </div>
    </div>
  );
};
