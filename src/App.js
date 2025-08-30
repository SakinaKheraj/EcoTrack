import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/SignUp";
import Login from "./components/LogIn";
import ReportForm from "./components/ReportForm";
import ReportsDashboard from "./components/ReportsDashboard";
import Navbar from "./components/Navbar";
import Leaderboard from "./components/leaderboard";
import Home from "./components/home";

function App() {
  return (
    <Router>
      <Navbar /> {/* Added Navbar here */}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report" element={<ReportForm />} />
        <Route path="/dashboard" element={<ReportsDashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
