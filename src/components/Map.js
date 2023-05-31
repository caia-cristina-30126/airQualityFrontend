import React, { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import { Button, Grid, Typography } from "@mui/material";
import { generateMarkerIcon } from "util/generateMarkerIcon";
import {
  RowDirectionFormGrid,
  CategoryTypography,
} from "styledComponentsAPI/Component";
import { LastMeasurement } from "./measurements/LastMeasurement";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from "react-router-dom";
import { AirIndexQuality } from "./AirIndexQuality";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { Sidebar } from "./sidebar/Sidebar";

export const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDXxIwkofQAFceNtxC1sA0DuSFAY01neeA",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <SimpleMap />;
};

const SimpleMap = () => {
  const center = useMemo(() => ({ lat: 46.757949, lng: 23.591042 }), []); //performs the calc once the dep changes.
  //Calculate the value once => reuse it everytime it rerenders
  const [sensors, setSensors] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  // const [aqi, setAqi] = useState(null);

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
      } catch (error) {
        console.error("Error retrieving sensors:", error);
      }
    };

    fetchSensors();
  }, []);

  const pollutants = ["PM25", "PM10", "NO2", "O3", "SO2"];
  const weatherData = ["temp", "humidity", "pressure"];

  const navigate = useNavigate();
  const handleClick = (uuid) =>
    navigate(`/map/measurementsChart?sensorUUID=${uuid}`);

  /* const createColor = (sensorUUID) => {
    fetchAQI(sensorUUID);
  }; */
  return (
    <div>
      <Sidebar />

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
            <Grid>
              {activeMarker.active ? (
                <>
                  {/*                 {console.log("AQI FOR COLORRR:", aqi)}
                   */}{" "}
                  <RowDirectionFormGrid>
                    <LocationOnOutlinedIcon />
                    <Typography variant="subtitle1" fontWeight={"bold"}>
                      {activeMarker.name}
                    </Typography>
                  </RowDirectionFormGrid>
                  <AirIndexQuality
                    sensorUUID={activeMarker.uuid}
                    measurementType={"temp"}
                  />
                  <CategoryTypography>
                    Pollutant concentration
                  </CategoryTypography>
                  <RowDirectionFormGrid>
                    {pollutants.map((pollutant) => (
                      <LastMeasurement
                        sensorUUID={activeMarker.uuid}
                        measurementType={pollutant}
                      />
                    ))}
                  </RowDirectionFormGrid>
                  <CategoryTypography>Weather data</CategoryTypography>
                  <RowDirectionFormGrid>
                    {weatherData.map((weather) => (
                      <LastMeasurement
                        sensorUUID={activeMarker.uuid}
                        measurementType={weather}
                      />
                    ))}
                  </RowDirectionFormGrid>
                  <Button
                    sx={{ my: 1 }}
                    variant="contained"
                    onClick={() => handleClick(activeMarker.uuid)}
                  >
                    See charts for this sensor
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="subtitle1">
                    {activeMarker.name}
                  </Typography>
                  <Typography>This sensor is inactive</Typography>
                </>
              )}
            </Grid>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};
