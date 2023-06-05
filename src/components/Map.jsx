import React, { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { generateMarkerIcon } from "util/generateMarkerIcon";
import {
  RowDirectionFormGrid,
  CategoryTypography,
  SpaceBetweenGrid,
} from "styledComponentsAPI/Component";
import { LastMeasurement } from "./measurements/LastMeasurement";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from "react-router-dom";
import { AirIndexQuality } from "./AirIndexQuality";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { Sidebar } from "./sidebar/Sidebar";
import CircleIcon from "@mui/icons-material/Circle";
export const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDXxIwkofQAFceNtxC1sA0DuSFAY01neeA",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <SimpleMap />;
};

const SimpleMap = () => {
  const center = useMemo(() => ({ lat: 46.757949, lng: 23.591042 }), []);
  //Calculate the value once => reuse it everytime it rerenders
  const [sensors, setSensors] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  // const [aqi, setAqi] = useState(null);
  const [loading, isLoading] = useState(true);
  const handleMarkerClick = (marker) => {
    setActiveMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setActiveMarker(null);
  };
  /*   const fetchAQI = (sensorUUID) => {
    axios
      .get("http://localhost:8080/api/aqi", {
        headers: {
          sensorUUID: sensorUUID,
        },
      })
      .then((response) => {
        console.log("aiq for color ", response.data.value);
        setAqi(response.data.value);
      })
      .catch((error) => {
        alert(error);
      });
  }; */
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uuid = user.uid;
        console.log("uuid", uuid);
      } else console.log("user is logged out");
    });
    const fetchSensors = async () => {
      try {
        axios.interceptors.request.use(function (config) {
          const token = localStorage.getItem("accessToken");
          if (token !== undefined) {
            config.headers.Authorization = token;
          }

          return config;
        });

        const response = await axios.get(
          "http://localhost:8080/api/sensor/list"
        );
        setSensors(response.data);
        isLoading(false);
      } catch (error) {
        console.error("Error retrieving sensors:", error);
        isLoading(false);
      }
    };

    fetchSensors();
  }, []);

  const pollutants = ["PM25", "PM10", "NO2", "O3", "SO2"];
  const weatherData = ["temp", "humidity", "pressure"];

  const navigate = useNavigate();
  const handleClick = (uuid) =>
    navigate(`/map/measurementsChart?sensorUUID=${uuid}`);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerStyle={{ width: "100%", height: "100vh" }}
          options={{ minZoom: 1 }}
        >
          {sensors.map((sensor) => (
            <Marker
              key={sensor.uuid}
              position={{
                lat: sensor.location.latitude,
                lng: sensor.location.longitude,
              }}
              onClick={() => handleMarkerClick(sensor)}
              icon={{
                url: `data:image/svg+xml;charset=utf-8;base64,${btoa(
                  generateMarkerIcon("green")
                )}`,
                scaledSize: new window.google.maps.Size(32, 32),
              }}
            />
          ))}
          {loading ? (
            <CircularProgress size={60} />
          ) : (
            <>
              {activeMarker && (
                <InfoWindow
                  position={{
                    lat: activeMarker.location.latitude,
                    lng: activeMarker.location.longitude,
                  }}
                  onCloseClick={handleInfoWindowClose}
                  options={{
                    pixelOffset: new window.google.maps.Size(0, -28),
                  }}
                >
                  {activeMarker.active ? (
                    <>
                      <Grid
                        sx={{
                          minWidth: "250px",
                          minHeight: "350px",
                        }}
                      >
                        <RowDirectionFormGrid>
                          <LocationOnOutlinedIcon fontSize="large" />
                          <Typography
                            variant="h5"
                            fontWeight={"bold"}
                            sx={{ alignSelf: "center", ml: 2 }}
                          >
                            {activeMarker.name}
                          </Typography>
                        </RowDirectionFormGrid>
                        <AirIndexQuality
                          sensorUUID={activeMarker.uuid}
                          measurementType={"temp"}
                        />
                        <Divider sx={{ mb: 3 }} />
                        <CategoryTypography variant="h6">
                          Pollutant concentration
                        </CategoryTypography>
                        <RowDirectionFormGrid>
                          {pollutants.map((pollutant) => (
                            <LastMeasurement
                              sensorUUID={activeMarker.uuid}
                              measurementType={pollutant}
                              usage={"pollutant"}
                            />
                          ))}
                        </RowDirectionFormGrid>
                        <CategoryTypography variant="h6">
                          Weather data
                        </CategoryTypography>
                        <RowDirectionFormGrid>
                          {weatherData.map((weather) => (
                            <LastMeasurement
                              sensorUUID={activeMarker.uuid}
                              measurementType={weather}
                              usage={"weather"}
                            />
                          ))}
                        </RowDirectionFormGrid>
                        <Grid
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            sx={{ my: 1, height: 40, textTransform: "none" }}
                            variant="contained"
                            onClick={() => handleClick(activeMarker.uuid)}
                          >
                            See charts for this sensor
                          </Button>
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <Grid
                      sx={{
                        padding: 1,
                      }}
                    >
                      <Typography variant="subtitle1">
                        {activeMarker.name}
                      </Typography>
                      <Typography>This sensor is inactive</Typography>
                    </Grid>
                  )}
                </InfoWindow>
              )}
            </>
          )}
          <Box
            position="absolute"
            top={10}
            right={10}
            padding={1}
            component={Paper}
            elevation={3}
            bgcolor="rgba(255, 255, 255, 0.8)"
          >
            <Typography fontSize={20} fontWeight={"bold"} textAlign={"center"}>
              Legend
            </Typography>
            <Grid sx={{ display: "flex", flexDirection: "column" }}>
              <Grid
                sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}
              >
                <CircleIcon style={{ color: "#50f0e6" }} />
                <Typography textAlign={"center"}>good</Typography>
              </Grid>
              <Grid
                sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}
              >
                <CircleIcon style={{ color: "#50ccaa" }} />
                <Typography textAlign={"center"}>fair</Typography>
              </Grid>
              <Grid
                sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}
              >
                <CircleIcon style={{ color: "#f0e641" }} />
                <Typography textAlign={"center"}>moderate</Typography>
              </Grid>
              <Grid
                sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}
              >
                <CircleIcon style={{ color: "#ff5050" }} />
                <Typography textAlign={"center"}>poor</Typography>
              </Grid>

              <Grid
                sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}
              >
                <CircleIcon style={{ color: "#960032" }} />
                <Typography textAlign={"center"}>very poor</Typography>
              </Grid>
              <Grid
                sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}
              >
                <CircleIcon style={{ color: "#7d2181" }} />

                <Typography textAlign={"center"}>extremely poor</Typography>
              </Grid>
              <Grid
                sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}
              >
                <CircleIcon style={{ color: "#6f6f6f" }} />

                <Typography textAlign={"center"}>no data</Typography>
              </Grid>
            </Grid>
          </Box>
        </GoogleMap>
      </div>
    </div>
  );
};
