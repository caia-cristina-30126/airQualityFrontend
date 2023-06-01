import axios from "axios";
import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Sidebar } from "../sidebar/Sidebar";
import { DeleteSensorDialog } from "./DeleteSensorDialog";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { FirstPage, LastPage, ChevronLeft, ChevronRight } from "@mui/icons-material";


export const SensorsTableContent = () => {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    const fetchSensors = async () => {
      try {
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
  const navigate = useNavigate();
const handleRowClick = (event, rowData) =>{
  navigate(`/sensors/sensorDetails?sensorUUID=${rowData.uuid}`);
}
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
    {
      title: "Delete",
      field: "uuid",
      sorting: false,
      render: (rowData) => {
        const { uuid, name } = rowData;
        return <DeleteSensorDialog uuid={uuid} sensorName={name} />;
      },
    },
  ];
  const defaultMaterialTheme = createTheme();
  return (
    <div style={{ display: "flex", margin: "20px" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, marginTop: "72px" }}>
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            columns={columns}
            data={sensors}
            title="Sensors"
           icons={{
              FirstPage: FirstPage,
              LastPage: LastPage,
              PreviousPage: ChevronLeft,
              NextPage: ChevronRight,
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
              sorting: true
            }}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};
