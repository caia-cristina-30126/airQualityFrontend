import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Sidebar } from "components/sidebar/Sidebar";
import React from "react";
import { UpdateForm } from "util/UpdateForm";

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
          <Box>
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <UpdateForm
                  color={"#50f0e6"}
                  title={"Good"}
                  content={<Grid></Grid>}
                />
              </CardContent>
            </Card>
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <UpdateForm
                  color={"#50ccaa"}
                  title={"Fair"}
                  content={<Grid></Grid>}
                />
              </CardContent>
            </Card>
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <UpdateForm
                  color={"#f0e641"}
                  title={"Moderate"}
                  content={<Grid></Grid>}
                />
              </CardContent>
            </Card>
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <UpdateForm
                  color={"#ff5050"}
                  title={"Poor"}
                  content={<Grid></Grid>}
                />
              </CardContent>
            </Card>
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <UpdateForm
                  color={"#960032"}
                  title={"Very poor"}
                  content={<Grid></Grid>}
                />
              </CardContent>
            </Card>
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <UpdateForm
                  color={"#7d2181"}
                  title={"Extremely poor"}
                  content={<Grid></Grid>}
                />
              </CardContent>
            </Card>
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <UpdateForm
                  color={"#6f6f6f"}
                  title={"No data"}
                  content={<Grid></Grid>}
                />
              </CardContent>
            </Card>
          </Box>
        </Container>
      </div>
    </div>
  );
};
