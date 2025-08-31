import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Step 1: Report an Incident",
      description:
        "Users submit reports via the app with photos, select the category of incident, and the location is automatically captured. Each report helps authorities monitor mangrove areas in real-time.",
    },
    {
      title: "Step 2: Validation & Analysis",
      description:
        "Reports are initially verified through photo, location, and category checks. Admins can approve reports for accuracy, ensuring reliable data for authorities.",
    },
    {
      title: "Step 3: Community Engagement & Gamification",
      description:
        "Verified reports earn points, badges, and leaderboard positions. This encourages participation and makes mangrove conservation fun and competitive.",
    },
    {
      title: "Step 4: Data for Authorities",
      description:
        "Authorities access dashboards showing verified reports, hotspots, and trends over time, allowing them to allocate resources and take informed action.",
    },
    {
      title: "Step 5: Impact",
      description:
        "By combining community reporting and accurate data, EcoTrack strengthens mangrove conservation, mitigates illegal activities, and empowers citizens to protect their environment.",
    },
  ];

  return (
    <div className="min-h-screen bg-green-50 font-sans text-gray-900 py-20 px-6">
      <h1 className="text-5xl font-bold text-center text-green-700 mb-12">
        🌿 How EcoTrack Works
      </h1>

      <div className="max-w-4xl mx-auto relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 h-full border-l-4 border-green-300"></div>

        {/* Steps */}
        <div className="space-y-14">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start space-x-6 relative">
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white font-bold flex items-center justify-center text-xl">
                  {idx + 1}
                </div>
              </div>

              {/* Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 flex-1">
                <h2 className="text-2xl font-bold text-green-700 mb-2">{step.title}</h2>
                <p className="text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-20">
        <a
          href="/signup"
          className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition"
        >
          Join & Start Reporting
        </a>
      </div>
    </div>
  );
};

export default HowItWorks;
