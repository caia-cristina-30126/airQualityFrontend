import { Container, Typography } from "@mui/material";
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
                  performing AQI are: PM10 and NO2.
                </>
              }
            />
          </RowDirectionFormGrid>
          <AQITable />
        </Container>
      </div>
    </div>
  );
};
