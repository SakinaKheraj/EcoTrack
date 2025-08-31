import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/SignUp";
import Login from "./components/LogIn";
import ReportForm from "./components/ReportForm";
import ReportsDashboard from "./components/ReportsDashboard";
import Navbar from "./components/Navbar";
import Leaderboard from "./components/leaderboard";
import Home from "./components/home";
import AuthorityDashboard from "./components/AuthorityDashboard"; 
import AboutUs from "./components/AboutUs";
import HowItWorks from "./components/HowItWorks";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar on all pages */}
            <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report" element={<ReportForm />} />
        <Route path="/dashboard" element={<ReportsDashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/authority-dashboard" element={<AuthorityDashboard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
    </Router>
  );
}

export default App;
