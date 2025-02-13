import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import HolidayList from "./components/HolidayList";
import Navbar from "./components/Navbar"; // Import Navbar

function App() {
  return (
    <Router>
      <Navbar /> {/* Add Navbar here */}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/holidays" element={<HolidayList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
