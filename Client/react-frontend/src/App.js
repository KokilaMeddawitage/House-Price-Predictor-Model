import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PricePredictor from "./pages/PricePredictor";

function App() {
  // Component to conditionally render NavBar based on route

  return (
    <div className="center">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/price-predictor" element={<PricePredictor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
