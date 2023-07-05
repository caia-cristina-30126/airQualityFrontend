import { Container, Grid, Paper, Typography } from "@mui/material";
import { Sidebar } from "components/sidebar/Sidebar";
import React from "react";
import PaperFeedback from "./PaperFeedback";
import { RowDirectionFormGrid } from "styledComponentsAPI/Component";
import AQITable from "./AQITable";

export const LegendExplained = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, marginTop: "50px" }}>
        <Typography
          variant="h4"
          fontWeight={"bold"}
          textAlign={"center"}
          sx={{ mb: 5 }}
        >
          Legend Explained
        </Typography>
        <Container maxWidth="xl">
          <RowDirectionFormGrid>
            <PaperFeedback
              color={"#50f0e6"}
              title={"Good"}
              content={
                <>
                  The air feels amazing! Go out and make the most of your life.
                </>
              }
            />
            <PaperFeedback
              color={"#50ccaa"}
              title={"Fair"}
              content={
                <>The air quality is satisfactory for outdoor activities.</>
              }
            />
            <PaperFeedback
              color={"#f0e641"}
              title={"Moderate"}
              content={
                <>
                  The air outside may impact sensitive individuals in a
                  adversely way.
                </>
              }
            />
          </RowDirectionFormGrid>
          <RowDirectionFormGrid>
            <PaperFeedback
              color={"#ff5050"}
              title={"Poor"}
              content={
                <>
                  The air is polluted and can adversely affect your well-being.
                </>
              }
            />
            <PaperFeedback
              color={"#960032"}
              title={"Very poor"}
              content={
                <>
                  The air is heavily polluted and poses a significant risk to
                  your health!
                </>
              }
            />
            <PaperFeedback
              color={"#7d2181"}
              title={"Extremely poor"}
              content={
                <>
                  The air poses a serious threat to your health and even your
                  life. Remain indoors!
                </>
              }
            />

            <PaperFeedback
              color={"#6f6f6f"}
              title={"No data"}
              content={
                <>
                  Data is insufficient. The minimum required pollutants for
                  performing AQI are: PM2.5 and NO2.
                </>
              }
            />
          </RowDirectionFormGrid>
          <AQITable />

          <Grid sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Paper
              sx={{ width: "500px", mt: 2, p: 1, backgroundColor: "#f5f5f5" }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#0386f4",
                  textAlign: "center",
                  fontSize: 23,
                  marginBottom: 1,
                }}
              >
                Performing the AQI
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 18,
                  lineHeight: "18px",
                  textAlign: "center",
                }}
              >
                The air quality index is determined by selecting the highest
                value among the measured parameters, which include PM2.5, PM10,
                NO2, SO2, and O3. However, it is mandatory to include the values
                of PM2.5 and NO2 in the calculation. The index represents the
                maximum value obtained from these parameters, indicating the
                overall air quality.
              </Typography>
            </Paper>
          </Grid>
        </Container>
      </div>
    </div>
  );
};
