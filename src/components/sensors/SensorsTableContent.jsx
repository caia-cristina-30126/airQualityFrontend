import axios from "axios";
import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Sidebar } from "../sidebar/Sidebar";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import {
  FirstPage,
  LastPage,
  ChevronLeft,
  ChevronRight,
  Sort,
  Search,
  Clear,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { SpaceBetweenGrid } from "styledComponentsAPI/Component";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "components/firebaseConfig";
import NotAuthneticatedUser from "components/NotAuthenticatedUser";

export const SensorsTableContent = () => {
  const [sensors, setSensors] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

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
            setIsLoading(false);
          } catch (error) {
            console.error("Error retrieving sensors:", error);
            setIsLoading(false);
          }
        };
        fetchSensors();
      } else {
        setIsLoading(false);
      }
    });
  }, []);
  const navigate = useNavigate();
  const handleRowClick = (event, rowData) => {
    navigate(`/sensors/sensorDetails?sensorUUID=${rowData.uuid}`);
  };
  const handleAddSensorClick = () => {
    navigate(`/addSensor`);
  };
  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Creation Date",
      field: "creationDate",
      render: (rowData) => {
        const { creationDate } = rowData;
        if (!creationDate) return "-";
        return `${creationDate[0]}/${creationDate[1]}/${creationDate[2]}`;
      },
    },
  ];
  const defaultMaterialTheme = createTheme();

  return (
    <>
      {isLoading ? (
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
          <div style={{ flexGrow: 1, marginTop: "50px" }}>
            <Container maxWidth="xl">
              {isLoading ? (
                <CircularProgress size={50} />
              ) : (
                <>
                  <SpaceBetweenGrid>
                    <Typography variant="h3" sx={{ mb: 2 }}>
                      Sensors
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        height: 50,
                        backgroundColor: "#65d652",
                        fontWeight: "bold",
                      }}
                      onClick={handleAddSensorClick}
                      size="small"
                    >
                      Add sensor
                    </Button>
                  </SpaceBetweenGrid>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Select a sensor to show related data
                  </Typography>
                  <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                      columns={columns}
                      data={sensors}
                      title=""
                      icons={{
                        FirstPage: FirstPage,
                        LastPage: LastPage,
                        PreviousPage: ChevronLeft,
                        NextPage: ChevronRight,
                        SortArrow: Sort,
                        Search: Search,
                        ResetSearch: Clear,
                      }}
                      onRowClick={handleRowClick}
                      options={{
                        search: true,
                        pageSize: 20,
                        pageSizeOptions: [5, 20, 50],
                        emptyRowsWhenPaging: false,
                        headerStyle: {
                          backgroundColor: "#f7f7f7",
                        },
                        sorting: true,
                        actionsColumnIndex: -1,
                      }}
                    />
                  </ThemeProvider>
                </>
              )}
            </Container>
          </div>
        </div>
      ) : (
        <NotAuthneticatedUser />
      )}
    </>
  );
};
