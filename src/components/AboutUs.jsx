import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="font-sans text-gray-900 bg-green-50">

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4">EcoTrack</h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
          Empowering communities to protect and restore mangrove forests through technology and gamified participation.
        </p>
      </div>

      {/* About Content */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">

        <div className="bg-white rounded-2xl shadow-lg p-10 border-l-8 border-green-600">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Why Mangroves Matter</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            Mangrove forests protect coastlines from storms, store carbon, and host diverse species. Yet, illegal cutting, pollution, and land reclamation are threatening these vital ecosystems. Without proper monitoring and conservation, these natural barriers are at risk.
          </p>
        </div>

        <div className="bg-green-100 rounded-2xl shadow-lg p-10 border-l-8 border-green-700">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Our Approach</h2>
          <p className="text-gray-900 text-lg leading-relaxed">
            EcoTrack allows communities, citizen scientists, and authorities to report threats in real time. Using geotagged photos, AI-assisted validation, and satellite imagery, the system ensures accurate monitoring. Verified reports are shared with local authorities for swift action.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-10 border-l-8 border-green-600">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Gamification & Community Engagement</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            Users earn points, badges, and leaderboard positions for submitting verified reports. This gamified system encourages consistent participation and empowers communities to actively protect their environment.
          </p>
        </div>

        <div className="bg-green-100 rounded-2xl shadow-lg p-10 border-l-8 border-green-700">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Data & Insights for Authorities</h2>
          <p className="text-gray-900 text-lg leading-relaxed">
            Cloud-based dashboards provide authorities and NGOs with real-time analytics, trends, and actionable insights. This allows for informed policy decisions, efficient enforcement, and better resource allocation.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-10 border-l-8 border-green-600">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Our Mission</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            To restore and protect mangrove ecosystems while empowering communities through technology. We envision thriving mangroves and communities actively engaged in conservation.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link
            to="/signup"
            className="inline-block bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition mr-4"
          >
            Join Us
          </Link>
          
        </div>

      </div>

      {/* Footer */}
      <footer className="py-8 bg-green-900 text-white text-center">
        <p>&copy; 2025 EcoTrack | All Rights Reserved</p>
      </footer>

    </div>
  );
};

export default AboutUs;
