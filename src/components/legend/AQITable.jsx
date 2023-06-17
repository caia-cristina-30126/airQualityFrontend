import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";

const AQITable = () => {
  return (
    <TableContainer component={Paper} style={{ backgroundColor: "'#f5f5f5" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ backgroundColor: "gray", color: "whitesmoke" }}>
              Pollutants (µg/m³)
            </TableCell>
            <TableCell style={{ backgroundColor: "#50f0e6" }}>Good</TableCell>
            <TableCell style={{ backgroundColor: "#50ccaa" }}>Fair</TableCell>
            <TableCell style={{ backgroundColor: "#f0e641" }}>
              Moderate
            </TableCell>
            <TableCell style={{ backgroundColor: "#ff5050" }}>Poor</TableCell>
            <TableCell style={{ backgroundColor: "#960032" }}>
              Very poor
            </TableCell>
            <TableCell style={{ backgroundColor: "#7d2181" }}>
              Extremely poor
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Tooltip
                title="Refers to air pollutants that possess a diameter equal to or smaller than 10 micrometers, which is equivalent to one thousandth of a millimeter."
                arrow
              >
                <span>Particles less than 2.5 µm (PM2.5)</span>
              </Tooltip>
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>0-10</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>10-20</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>20-25</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>25-50</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>50-75</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>75-800</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Tooltip
                title="Refers to air pollutants that possess a diameter equal to or smaller than 10 micrometers."
                arrow
                content=""
              >
                <span>Particles less than 10 µm (PM10)</span>
              </Tooltip>
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>0-20 </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>20-40</TableCell>
            <TableCell style={{ fontWeight: "bold" }}> 40-50</TableCell>
            <TableCell style={{ fontWeight: "bold" }}> 50-100 </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>100-150 </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>150-1200</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Tooltip
                title="A harmful gas in the air. It is produced by burning fossil fuels. High levels can cause health problems and contribute to pollution."
                arrow
                content=""
              >
                <span>Nitrogen dioxide (NO2)</span>
              </Tooltip>
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>0-40</TableCell>
            <TableCell style={{ fontWeight: "bold" }}> 40-90</TableCell>
            <TableCell style={{ fontWeight: "bold" }}> 90-120</TableCell>
            <TableCell style={{ fontWeight: "bold" }}> 120-230 </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>230-340</TableCell>
            <TableCell style={{ fontWeight: "bold" }}> 340-1000 </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Tooltip
                title="A harmful gas formed by chemical reactions in the atmosphere. It is a key component of smog and can cause respiratory issues."
                arrow
                content=""
              >
                <span>Ozone (O3)</span>
              </Tooltip>
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>0-50</TableCell>
            <TableCell style={{ fontWeight: "bold" }}> 50-100 </TableCell>
            <TableCell style={{ fontWeight: "bold" }}> 100-130 </TableCell>
            <TableCell style={{ fontWeight: "bold" }}> 130-240 </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>240-380 </TableCell>
            <TableCell style={{ fontWeight: "bold" }}> 380-800 </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Tooltip
                title="A gaseous air pollutant emitted from burning fossil fuels containing sulphur. It can cause respiratory problems and contribute to air pollution."
                arrow
                content=""
              >
                <span>Sulphur dioxide (SO2)</span>
              </Tooltip>
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>0-100 </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>100-200 </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>200-350 </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>350-500 </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>500-750 </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>750-1250 </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AQITable;
