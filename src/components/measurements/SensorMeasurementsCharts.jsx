import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
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
import { format } from "date-fns";

export const SensorMeasurementsCharts = () => {
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
  const [sensorData, setSensorData] = useState("");

  const pollutantsUnit = "µg/m³";
  useEffect(() => {
    const getUuidFromParams = new URLSearchParams(location.search);
    const sensorUUID = getUuidFromParams.get("sensorUUID");
    const fetchSensor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/getSensorByUUID`,
          {
            headers: { UUID: sensorUUID },
          }
        );
        setSensorData(response.data.name);
      } catch (error) {
        console.error("Error fetching sensor:", error);
      }
    };

    fetchSensor();
    const fetchLastHoursMeasurements = async () => {
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
            "http://localhost:8080/api/sensor/measurement/lastHoursMeasurements",
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

    fetchLastHoursMeasurements();
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
      width: 340,
      height: 200,
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
      offset: 10,
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
  const pm25Timestamp = pm25.map((obj) => obj.instantTime.seconds);
  const pm10Values = pm10.map((obj) => obj.value);
  const pm10Timestamp = pm10.map((obj) => obj.instantTime.seconds);
  const no2Values = no2.map((obj) => obj.value);
  const no2Timestamp = no2.map((obj) => obj.instantTime.seconds);
  const o3Values = o3.map((obj) => obj.value);
  const o3Timestamp = o3.map((obj) => obj.instantTime.seconds);
  const so2Values = so2.map((obj) => obj.value);
  const so2Timestamp = so2.map((obj) => obj.instantTime.seconds);
  const tempValues = temp.map((obj) => obj.value);
  const tempTimestamp = temp.map((obj) => obj.instantTime.seconds);
  const pressureValues = pressure.map((obj) => obj.value);
  const pressureTimestamp = pressure.map((obj) => obj.instantTime.seconds);
  const humidityValues = humidity.map((obj) => obj.value);
  const humidityTimestamp = humidity.map((obj) => obj.instantTime.seconds);

  const lastDateTimestamp = (seconds) => {
    return format(new Date(seconds * 1000), "d MMMM yyyy HH:mm");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, marginTop: "40px" }}>
        <Typography variant="h4" fontWeight={"bold"} sx={{ mb: 5, ml: 8 }}>
          Measurements charts for {sensorData} sensor
        </Typography>
        <Box
          position="absolute"
          top={40}
          right={20}
          padding={1.5}
          component={Paper}
          elevation={3}
          bgcolor="rgba(255, 255, 255, 0.8)"
        >
          <Grid sx={{ width: "150px" }}>
            <Typography
              variant="h4"
              fontWeight={"bold"}
              sx={{
                fontFamily: '"Nunito Sans",sans-serif',
                fontWeight: 700,
                fontSize: 18,

                textAlign: "center",
              }}
            >
              The recorded measurements cover the previous 12-hour period,
              starting from the date and time displyed.
            </Typography>
          </Grid>
        </Box>

        <Container maxWidth="xl">
          <RowDirectionFormGrid sx={{ justifyContent: "center", p: 3 }}>
            {isLoading ? (
              <CircularProgress size={20} />
            ) : (
              <>
                <Grid container spacing={3}>
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      columnGap: 4,
                      mx: 25,
                    }}
                  >
                    <Grid item>
                      <ParentPaper>
                        <SpaceBetweenGrid marginBottom={1}>
                          <KPITitleTypography>PM2.5</KPITitleTypography>
                          <TypographyHealthKitAndDate>
                            Pollutant concentration
                          </TypographyHealthKitAndDate>
                        </SpaceBetweenGrid>
                        <SpaceBetweenGrid marginBottom={1}>
                          <KPITypography color={"blue"}>Hourly</KPITypography>
                          <TypographyHealthKitAndDate>
                            {pm25Timestamp.length > 0
                              ? lastDateTimestamp(pm25Timestamp[0])
                              : "-"}
                          </TypographyHealthKitAndDate>
                        </SpaceBetweenGrid>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={chartOptions(
                            pm25Values.reverse(),
                            "#EE12E6",
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
                          <KPITypography color={"blue"}>Hourly</KPITypography>
                          <TypographyHealthKitAndDate>
                            {pm10Timestamp.length > 0
                              ? lastDateTimestamp(pm10Timestamp[0])
                              : "-"}
                          </TypographyHealthKitAndDate>
                        </SpaceBetweenGrid>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={chartOptions(
                            pm10Values.reverse(),
                            "#8a011f",
                            "line",
                            pollutantsUnit
                          )}
                        />
                      </ParentPaper>
                    </Grid>
                  </Grid>
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      columnGap: 4,
                      mt: 3,
                    }}
                  >
                    <Grid item>
                      <ParentPaper>
                        <SpaceBetweenGrid marginBottom={1}>
                          <KPITitleTypography>NO2</KPITitleTypography>
                          <TypographyHealthKitAndDate>
                            Pollutant concentration
                          </TypographyHealthKitAndDate>
                        </SpaceBetweenGrid>
                        <SpaceBetweenGrid marginBottom={1}>
                          <KPITypography color={"blue"}>Hourly</KPITypography>
                          <TypographyHealthKitAndDate>
                            {no2Timestamp.length > 0
                              ? lastDateTimestamp(no2Timestamp[0])
                              : "-"}
                          </TypographyHealthKitAndDate>
                        </SpaceBetweenGrid>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={chartOptions(
                            no2Values.reverse(),
                            "#CA4166",
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
                          <KPITypography color={"blue"}>Hourly</KPITypography>
                          <TypographyHealthKitAndDate>
                            {o3Timestamp.length > 0
                              ? lastDateTimestamp(o3Timestamp[0])
                              : "-"}
                          </TypographyHealthKitAndDate>
                        </SpaceBetweenGrid>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={chartOptions(
                            o3Values.reverse(),
                            "#fe0000",
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
                          <KPITypography color={"blue"}>Hourly</KPITypography>
                          <TypographyHealthKitAndDate>
                            {so2Timestamp.length > 0
                              ? lastDateTimestamp(so2Timestamp[0])
                              : "-"}
                          </TypographyHealthKitAndDate>
                        </SpaceBetweenGrid>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={chartOptions(
                            so2Values.reverse(),
                            "#5637BC",
                            "line",
                            pollutantsUnit
                          )}
                        />
                      </ParentPaper>
                    </Grid>
                  </Grid>
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      columnGap: 4,
                      mt: 3,
                    }}
                  >
                    <Grid item>
                      <ParentPaper>
                        <SpaceBetweenGrid marginBottom={1}>
                          <KPITitleTypography>Temperature</KPITitleTypography>
                          <TypographyHealthKitAndDate>
                            Weather data
                          </TypographyHealthKitAndDate>
                        </SpaceBetweenGrid>
                        <SpaceBetweenGrid marginBottom={1}>
                          <KPITypography color={"blue"}>Hourly</KPITypography>
                          <TypographyHealthKitAndDate>
                            {tempTimestamp.length > 0
                              ? lastDateTimestamp(tempTimestamp[0])
                              : "-"}
                          </TypographyHealthKitAndDate>
                        </SpaceBetweenGrid>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={chartOptions(
                            tempValues.reverse(),
                            "#29EE12",
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
                          <KPITypography color={"blue"}>Hourly</KPITypography>
                          <TypographyHealthKitAndDate>
                            {pressureTimestamp.length > 0
                              ? lastDateTimestamp(pressureTimestamp[0])
                              : "-"}
                          </TypographyHealthKitAndDate>
                        </SpaceBetweenGrid>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={chartOptions(
                            pressureValues.reverse(),
                            "#13aaf8",
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
                          <KPITypography color={"blue"}>Hourly</KPITypography>
                          <TypographyHealthKitAndDate>
                            {humidityTimestamp.length > 0
                              ? lastDateTimestamp(humidityTimestamp[0])
                              : "-"}
                          </TypographyHealthKitAndDate>
                        </SpaceBetweenGrid>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={chartOptions(
                            humidityValues.reverse(),
                            "#5637BC",
                            "column",
                            "%"
                          )}
                        />
                      </ParentPaper>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
            {/*   {lastWeekMeasurements.map((timestamp) => (
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
