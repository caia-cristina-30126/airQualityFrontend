import { Paper, Typography } from "@mui/material";
import React from "react";

const PaperFeedback = (props) => {
  return (
    <Paper sx={{ width: "250px", m: 1, p: 1, backgroundColor: "#f5f5f5" }}>
      <Typography
        variant="h6"
        sx={{
          marginTop: 1,
          fontWeight: "bold",
          color: props.color,
          textAlign: "center",
        }}
      >
        {props.title}
      </Typography>
      <Typography
        sx={{
          fontFamily: '"Nunito Sans",sans-serif',
          fontWeight: 700,
          fontSize: 15,
          lineHeight: "18px",

          textAlign: "center",
        }}
      >
        {props.content}
      </Typography>
    </Paper>
  );
};

export default PaperFeedback;
