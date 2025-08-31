import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Home = () => {
  return (
    <div className="font-sans text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-green-500 text-white h-screen flex flex-col justify-center items-center px-6">
        <h1 className="text-5xl font-bold mb-4">
          Mangrove Conservation Monitoring System
        </h1>
        <p className="text-xl mb-8">
          Empowering communities to protect coastal ecosystems.
        </p>

        {/* Buttons */}
        <div className="flex space-x-6">
          <Link
            to="/report"
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
          >
            Report Incident
          </Link>
          <Link
            to="/leaderboard"
            className="bg-yellow-500 text-white px-6 py-3 rounded-full text-lg hover:bg-yellow-600 transition"
          >
            View Leaderboard
          </Link>
          <Link
            to="/signup"
            className="bg-gray-900 text-white px-6 py-3 rounded-full text-lg hover:bg-gray-700 transition"
          >
            Join Us
          </Link>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-20 px-6 bg-gray-50" id="problem">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Why Mangroves Matter</h2>
          <p className="text-lg">
            Mangrove forests are vital for biodiversity, carbon storage, and
            protecting coastlines from storms. Unfortunately, they face
            increasing threats like illegal cutting and dumping. Our system aims
            to address this problem.
          </p>
        </div>
      </section>

      {/* Features Section */}
<section className="py-20 bg-green-100" id="features">
  <div className="max-w-screen-xl mx-auto text-center">
    <h2 className="text-3xl font-semibold mb-12">
      Key Features of the System
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Mobile & Web Reporting</h3>
        <p>
          Users can report illegal activities via the web or mobile, with photos and geolocation data.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Automated Validation</h3>
        <p>
          Reports are automatically validated based on basic rules like photo and location, helping authorities focus on genuine incidents.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Map Visualization</h3>
        <p>
          All reports are visualized on a map with markers clustered for easier navigation and identification of hotspots.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Analytics & Leaderboard</h3>
        <p>
          Real-time charts and leaderboards show reporting trends, top contributors, and overall impact for better decision-making.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Impact Section */}
      <section className="py-20 px-6" id="impact">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Impact at a Glance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Improved Reporting</h3>
              <p>
                Increase reporting of illegal activities to help protect
                mangroves.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                Empowered Communities
              </h3>
              <p>
                Empower local communities to take part in conservation efforts.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Faster Action</h3>
              <p>
                Provide authorities with real-time data for quicker enforcement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="py-20 bg-blue-600 text-white text-center"
        id="get-involved"
      >
        <h2 className="text-3xl font-semibold mb-6">Get Involved</h2>
        <p className="text-lg mb-8">
          Join us in making a difference. Report an incident, support
          conservation efforts, or volunteer today!
        </p>

        <div className="flex justify-center space-x-6">
          <Link
            to="/report"
            className="bg-green-500 text-white px-6 py-3 rounded-full text-lg hover:bg-green-600 transition"
          >
            Report an Incident
          </Link>
          <Link
            to="/leaderboard"
            className="bg-yellow-500 text-white px-6 py-3 rounded-full text-lg hover:bg-yellow-600 transition"
          >
            View Leaderboard
          </Link>
          <Link
            to="/signup"
            className="bg-gray-900 text-white px-6 py-3 rounded-full text-lg hover:bg-gray-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white text-center">
        <p>&copy; 2025 Mangrove Conservation Monitoring | All rights reserved</p>
      </footer>
    </div>
  );
};

export default Home;
