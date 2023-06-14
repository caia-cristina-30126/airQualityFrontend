import React, { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
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
    libraries: ["places"],
  });

  if (!isLoaded) return <CircularProgress size={20} />;
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
  const [itemSelected, setItemSelected] = useState(null);

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
  const handleLegendClick = () => navigate("/legendExplanations");
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
          center={itemSelected || center}
          mapContainerStyle={{ width: "100%", height: "100vh" }}
          options={{ minZoom: 1 }}
        >
          {itemSelected && <Marker position={itemSelected} />}
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
                    // background: "blue",
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
                          Measurements data
                        </CategoryTypography>
                        <RowDirectionFormGrid>
                          {pollutants.map((pollutant) => (
                            <LastMeasurement
                              sensorUUID={activeMarker.uuid}
                              measurementType={pollutant}
                            />
                          ))}
                        </RowDirectionFormGrid>

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
                            color="success"
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

          <AutocompletePlaces setItemSelected={setItemSelected} />

          <Box
            position="absolute"
            top={60}
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
                <Typography textAlign={"center"}>Good</Typography>
              </Grid>
              <Grid
                sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}
              >
                <CircleIcon style={{ color: "#50ccaa" }} />
                <Typography textAlign={"center"}>Fair</Typography>
              </Grid>
              <Grid
                sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}
              >
                <CircleIcon style={{ color: "#f0e641" }} />
                <Typography textAlign={"center"}>Moderate</Typography>
              </Grid>
              <Grid
                sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}
              >
                <CircleIcon style={{ color: "#ff5050" }} />
                <Typography textAlign={"center"}>Poor</Typography>
              </Grid>

              <Grid
                sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}
              >
                <CircleIcon style={{ color: "#960032" }} />
                <Typography textAlign={"center"}>Very poor</Typography>
              </Grid>
              <Grid
                sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}
              >
                <CircleIcon style={{ color: "#7d2181" }} />

                <Typography textAlign={"center"}>Extremely poor</Typography>
              </Grid>
              <Grid
                sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}
              >
                <CircleIcon style={{ color: "#6f6f6f" }} />

                <Typography textAlign={"center"}>No data</Typography>
              </Grid>
            </Grid>
            <Grid sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleLegendClick}
                size="small"
                sx={{ textTransform: "none", my: 0.5 }}
              >
                Explanations
              </Button>
            </Grid>
          </Box>
        </GoogleMap>
      </div>
    </div>
  );
};

const AutocompletePlaces = ({ setItemSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const optionStyles = {
    padding: "8px 12px",
    cursor: "pointer",
  };
  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setItemSelected({ lat, lng });
  };
  const markerDelete = () => {
    setValue(""); // Clear the input field
    setItemSelected(null); // Disable the marker
  };
  return (
    <Box
      position="absolute"
      top={10}
      right={550}
      padding={1}
      component={Paper}
      elevation={3}
      bgcolor="rgba(255, 255, 255, 0.8)"
    >
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Search an address"
          style={{ height: "30px", minWidth: "200px" }}
        />
        {value && (
          <button onClick={markerDelete} style={{ marginLeft: "10px" }}>
            Clear
          </button>
        )}
        <ComboboxPopover>
          <ComboboxList style={{ backgroundColor: "white" }}>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption
                  key={place_id}
                  value={description}
                  style={optionStyles}
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </Box>
  );
};
