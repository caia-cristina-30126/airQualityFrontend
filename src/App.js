import { Routes, Route } from "react-router-dom";
import { HomePage, Map } from "components";
import { SensorsTableContent } from "components/sensors/SensorsTableContent";
import { SensorMeasurementsCharts } from "components/measurements/SensorMeasurementsCharts";
import LoginForm from "components/auth/LoginForm";
import RegisterForm from "components/auth/RegisterForm";
import { Account } from "components/account/Account";
import { AddSensorContentPage } from "components/sensors/AddSensorContentPage";
import { SensorDetailsPage } from "components/sensors/SensorDetailsPage";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
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
    </>
  );
};

export default App;
