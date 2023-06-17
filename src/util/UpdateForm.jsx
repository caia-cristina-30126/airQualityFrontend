import React from "react";
import { Grid, Typography } from "@mui/material";

export const UpdateForm = (props) => {
  return (
    <Grid container spacing={3}>
      <Grid item md={4} xs={12}>
        <Typography
          variant="h6"
          sx={{
            marginTop: 1,
            fontWeight: "bold",
            color: props.color,
          }}
        >
          {props.title}
        </Typography>
      </Grid>
      <Grid item md={8} sm={12} xs={12}>
        {props.content}
      </Grid>
    </Grid>
  );
};
