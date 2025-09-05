import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { WeatherDashboard } from "./pages/WeatherDashboard";
import { SupplyTracker } from "./pages/SupplyTracker";
import { ResearchPortal } from "./pages/ResearchPortal";
import { SurvivalGuides } from "./pages/SurvivalGuides";
import { EmergencyProtocols } from "./pages/EmergencyProtocols";
import { DataVisualization } from "./pages/DataVisualization";
import { CommunicationHub } from "./pages/CommunicationHub";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="weather" element={<WeatherDashboard />} />
        <Route path="supplies" element={<SupplyTracker />} />
        <Route path="research" element={<ResearchPortal />} />
        <Route path="guides" element={<SurvivalGuides />} />
        <Route path="emergency" element={<EmergencyProtocols />} />
        <Route path="data" element={<DataVisualization />} />
        <Route path="communication" element={<CommunicationHub />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;