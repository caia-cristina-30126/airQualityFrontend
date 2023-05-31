import { Box, Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { AccountGeneralSettings } from "./AccountGeneralSettings";
import { Sidebar } from "components/sidebar/Sidebar";

export const Account = (props) => {
  const tabs = [
    { label: "General", value: "general" },
    { label: "Permissions", value: "permissions" },
  ];

  const [currentTab, setCurrentTab] = useState("general");

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
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
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 5,
          }}
        >
          <Typography variant="h4">Account</Typography>
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="primary"
            value={currentTab}
            variant="scrollable"
            sx={{ mt: 3 }}
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
          <Divider sx={{ mb: 3 }} />
          {currentTab === "general" && <AccountGeneralSettings />}
        </Box>
      </Grid>
    </Grid>
  );
};
