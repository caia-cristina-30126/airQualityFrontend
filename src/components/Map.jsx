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
import { iconMarker } from "util/generateMarkerIcon";
import {
  RowDirectionFormGrid,
  CategoryTypography,
} from "styledComponentsAPI/Component";
import { LastMeasurement } from "./measurements/LastMeasurement";
import { useNavigate } from "react-router-dom";
import { AirIndexQuality } from "./AirIndexQuality";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { Sidebar } from "./sidebar/Sidebar";
import CircleIcon from "@mui/icons-material/Circle";
import NotAuthneticatedUser from "./NotAuthenticatedUser";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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
  const [sensors, setSensors] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [loading, isLoading] = useState(true);
  const handleMarkerClick = (marker) => {
    setActiveMarker(marker);
  };
  const [itemSelected, setItemSelected] = useState(null);

  const handleInfoWindowClose = () => {
    setActiveMarker(null);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const tokenFromLocalStorage = localStorage.getItem("accessToken");
        const token = tokenFromLocalStorage.substring(
          1,
          tokenFromLocalStorage.length - 1
        );
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
              "http://localhost:8080/api/sensor/list",
              {
                headers: {
                  idToken: token,
                },
              }
            );
            setSensors(response.data);
            isLoading(false);
          } catch (error) {
            console.error("Error retrieving sensors:", error);
            isLoading(false);
          }
        };

        fetchSensors();
      } else {
        isLoading(false);
      }
    });
  }, []);
  const handleLegendClick = () => navigate("/legendExplanations");

  const navigate = useNavigate();
  const handleClick = (uuid) =>
    navigate(`/map/measurementsChart?sensorUUID=${uuid}`);
  console.log("sensors lenght", sensors.length);
  console.log("loading", loading);

  return (
    <>
      {loading ? (
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flexGrow: 1 }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress size={100} />
            </Grid>
          </div>
        </div>
      ) : sensors && sensors.length > 0 ? (
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
                      iconMarker("#0281f2")
                    )}`,
                    scaledSize: new window.google.maps.Size(32, 32),
                  }}
                />
              ))}
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
                      <Grid>
                        <RowDirectionFormGrid sx={{ justifyContent: "start" }}>
                          <LocationOnIcon
                            fontSize="medium"
                            sx={{ color: "#0387f3", mt: 0.5 }}
                          />
                          <Typography
                            variant="h6"
                            fontWeight={"bold"}
                            sx={{ alignSelf: "center" }}
                          >
                            {activeMarker.name}
                          </Typography>
                        </RowDirectionFormGrid>
                        <AirIndexQuality
                          sensorUUID={activeMarker.uuid}
                          measurementType={"PM10"}
                        />
                        <Divider />
                        <CategoryTypography variant="h6" sx={{ my: 1 }}>
                          Measurements data
                        </CategoryTypography>
                        <Grid sx={{ maxWidth: "350px" }}>
                          <LastMeasurement sensorUUID={activeMarker.uuid} />
                        </Grid>
                        <Grid
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            sx={{
                              my: 1,
                              mt: 2,
                              height: 40,
                              textTransform: "none",
                              backgroundColor: "#66d751",
                              fontWeight: "bold",
                            }}
                            variant="contained"
                            color="success"
                            onClick={() => handleClick(activeMarker.uuid)}
                          >
                            See charts for this sensor
                          </Button>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid
                        sx={{
                          padding: 1,
                        }}
                      >
                        <RowDirectionFormGrid sx={{ justifyContent: "start" }}>
                          <LocationOnIcon
                            fontSize="medium"
                            sx={{ color: "#0387f3", mt: 0.5 }}
                          />
                          <Typography
                            variant="h6"
                            fontWeight={"bold"}
                            sx={{ alignSelf: "center" }}
                          >
                            {activeMarker.name}
                          </Typography>
                        </RowDirectionFormGrid>
                        <Typography
                          sx={{
                            fontFamily: '"Nunito Sans",sans-serif',
                            fontWeight: 700,
                            fontSize: 15,
                            lineHeight: "18px",
                            color: "#a2a8af",
                            mt: 0.5,
                          }}
                          textAlign={"center"}
                        >
                          This sensor is inactive
                        </Typography>
                      </Grid>
                    )}
                  </InfoWindow>
                )}
              </>
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
                <Typography
                  fontSize={20}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
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
      ) : (
        <NotAuthneticatedUser />
      )}
    </>
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
