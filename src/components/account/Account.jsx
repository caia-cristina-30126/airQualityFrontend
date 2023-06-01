import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { AccountGeneralSettings } from "./AccountGeneralSettings";
import { Sidebar } from "components/sidebar/Sidebar";

export const Account = () => {
  const tabs = [
    { label: "General", value: "general" },
    { label: "Permissions", value: "permissions" },
  ];

  const [currentTab, setCurrentTab] = useState("general");

  const handleTabsChange = (value) => {
    setCurrentTab(value);
  };

  return (
    <div style={{ display: "flex", margin: "20px" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, marginTop: "72px" }}>
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
      </div>
    </div>
  );
};
