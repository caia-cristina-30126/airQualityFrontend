import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { HomePage, Map } from "components";
import { SensorsTableContent } from "components/sensors/SensorsTableContent";
import { SensorMeasurementsCharts } from "components/measurements/SensorMeasurementsCharts";
import LoginForm from "components/auth/LoginForm";
import RegisterForm from "components/auth/RegisterForm";
import { Account } from "components/account/Account";
import { AddSensorContentPage } from "components/sensors/AddSensorContentPage";
import { SensorDetailsPage } from "components/sensors/SensorDetailsPage";
import ForgotPasswordForm from "components/auth/ForgotPasswordForm";
import { makeStyles } from "@mui/styles";
import { CssBaseline } from "@mui/material";
import React from "react";

const styleColor = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f0f0f0",
  },
}));

export const App = () => {
  const styleClass = styleColor();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === "/") {
      navigate("/signin");
    }
  }, [location.pathname, navigate]);

  return (
    <div className={styleClass.root}>
      <CssBaseline />
      <Routes>
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
        <Route path="/account" element={<Account />} />
        <Route path="/map" element={<Map />} />
        <Route
          path={`map/measurementsChart`}
          element={<SensorMeasurementsCharts />}
        />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sensors" element={<SensorsTableContent />} />
        <Route path={`sensors/sensorDetails`} element={<SensorDetailsPage />} />
        <Route path="/addSensor" element={<AddSensorContentPage />} />
      </Routes>
    </div>
  );
};

export default App;
