import { Typography } from "@mui/material";
import { Sidebar } from "components/sidebar/Sidebar";
import React from "react";

export const LegendExplanations = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, marginTop: "72px" }}>
        <Typography
          variant="h4"
          fontWeight={"bold"}
          textAlign={"center"}
          sx={{ mb: 5 }}
        >
          Legend Explanations
        </Typography>
      </div>
    </div>
  );
};
