import { Grid } from "@mui/material";
import React from "react";
import { Sidebar } from "./sidebar/Sidebar";

export const PageLayout = ({ children }) => (
  <Grid container sx={{ display: "flex" }}>
    <Grid item md={2.2}>
      <Sidebar />
    </Grid>
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        mt: 9,
      }}
    >
      {children}
    </Grid>
  </Grid>
);
