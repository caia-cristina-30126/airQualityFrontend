import { Routes, Route } from "react-router-dom";
import { HomePage, Map } from "components";
import { SensorsTableContent } from "components/SensorsTableContent";
import { SensorMeasurementsCharts } from "components/measurements/SensorMeasurementsCharts";
import LoginForm from "components/auth/LoginForm";
import RegisterForm from "components/auth/RegisterForm";
import { Account } from "components/account/Account";
import { AddSensorContent } from "components/sensors/AddSensorContent";

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
        <Route path="/sensorsTable" element={<SensorsTableContent />} />
        <Route path="/addSensor" element={<AddSensorContent />} />
      </Routes>
    </>
  );
};

export default App;
