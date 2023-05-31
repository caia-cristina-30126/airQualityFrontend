import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AccountGeneralSettings = (props) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        user.getIdTokenResult().then((idTokenResult) => {
          setEmail(idTokenResult.claims.email);
        });
      } else {
        console.log("User is signed out");
      }
    });
  }, []);

  return (
    <Box sx={{ mt: 4 }} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Email Address</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  mt: 1,
                  alignItems: "center",
                }}
              >
                <Typography fontWeight={"bold"}>{email}</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
