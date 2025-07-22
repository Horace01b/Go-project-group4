import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import GoBoard from "./GoBoard";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<GoBoard />} />
      </Routes>
    </Router>
  );
}

export default Routing;
