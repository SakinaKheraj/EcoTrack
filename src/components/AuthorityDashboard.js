import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from "react-leaflet";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import "@changey/react-leaflet-markercluster/dist/styles.min.css";
import L from "leaflet";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "leaflet/dist/leaflet.css";


// Custom icons
const icons = {
  cutting: new L.Icon({ iconUrl: "/icons/cutting.png", iconSize: [30, 40] }),
  dumping: new L.Icon({ iconUrl: "/icons/dumping.png", iconSize: [30, 40] }),
  reclamation: new L.Icon({ iconUrl: "/icons/reclamation.png", iconSize: [30, 40] }),
};

// Fit map bounds
function FitBounds({ reports }) {
  const map = useMap();
  useEffect(() => {
    const locs = reports
      .filter(r => r.lat && r.lng)
      .map(r => [r.lat, r.lng]);
    if (locs.length > 0) {
      const bounds = L.latLngBounds(locs);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [reports]);
  return null;
}

export default function AuthorityDashboard() {
  const [reports, setReports] = useState([]);
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      const snapshot = await getDocs(collection(db, "reports"));
      const data = snapshot.docs.map(doc => {
        const r = doc.data();

        // 1️⃣ Check photo exists
        const hasPhoto = !!r.photoURL;

        // 2️⃣ Duplicate check
        const isDuplicate = snapshot.docs.some(otherDoc => {
          if (otherDoc.id === doc.id) return false;
          const o = otherDoc.data();
          return (
            o.category === r.category &&
            Math.abs(o.lat - r.lat) < 0.0005 &&
            Math.abs(o.lng - r.lng) < 0.0005 &&
            o.timestamp?.toDate().toDateString() === r.timestamp?.toDate().toDateString()
          );
        });

        // 3️⃣ Description keyword check
        const matchesDescription = r.description?.toLowerCase().includes(r.category.toLowerCase());

        // ✅ Validated only if all conditions pass
        const validated = hasPhoto && !isDuplicate && matchesDescription;

        return { id: doc.id, ...r, validated };
      });

      setReports(data);
    };
    fetchReports();
  }, []);

  // SMART VALIDATION FUNCTION
  const runSmartValidation = async () => {
    setValidating(true);
    let updatedReports = [...reports];

    for (let r of reports) {
      const missingPhoto = !r.photoURL;
      const missingLocation = !r.lat || !r.lng;

      const autoValidated = !missingPhoto && !missingLocation;
      const reviewNeeded = missingPhoto || missingLocation;

      const reportRef = doc(db, "reports", r.id);
      await updateDoc(reportRef, {
        autoValidated,
        reviewNeeded,
      });

      r.autoValidated = autoValidated;
      r.reviewNeeded = reviewNeeded;
    }

    setReports(updatedReports);
    setValidating(false);
    alert("Smart Validation Completed!");
  };

  // Analytics
  const totalReports = reports.length;
  const categories = {};
  reports.forEach(r => {
    categories[r.category] = (categories[r.category] || 0) + 1;
  });

  const reportsByDate = {};
  reports.forEach(r => {
    const date = r.timestamp?.toDate().toLocaleDateString() || "Unknown";
    reportsByDate[date] = (reportsByDate[date] || 0) + 1;
  });
  const chartData = Object.entries(reportsByDate).map(([date, count]) => ({ date, count }));

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-green-700">📊 Authority Dashboard</h1>

      {/* Smart Validation Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={runSmartValidation}
          disabled={validating}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {validating ? "Validating..." : "Run Smart Validation"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-xl font-bold">{totalReports}</p>
          <p className="text-gray-500">Total Reports</p>
        </div>
        {Object.entries(categories).map(([cat, count]) => (
          <div key={cat} className="bg-white shadow rounded-lg p-4 text-center">
            <p className="text-xl font-bold">{count}</p>
            <p className="text-gray-500">{cat}</p>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="h-96 rounded-lg overflow-hidden shadow">
        <MapContainer center={[20, 80]} zoom={5} style={{ height: "100%", width: "100%" }}>
          <LayersControl position="topright">
            {/* Default Map */}
            <LayersControl.BaseLayer checked name="OSM Standard">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </LayersControl.BaseLayer>

            {/* Satellite View */}
            <LayersControl.BaseLayer name="Satellite View">
              <TileLayer
                url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                subdomains={['mt0','mt1','mt2','mt3']}
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          <MarkerClusterGroup>
            {reports.map(r =>
              r.lat && r.lng ? (
                <Marker
                  key={r.id}
                  position={[r.lat, r.lng]}
                  icon={icons[r.category] || icons.cutting}
                >
                  <Popup>
                    <strong>{r.category}</strong>
                    <br />
                    Reported by: {r.userEmail || "Anonymous"}
                    <br />
                    {r.description}
                    <br />
                    <span className={
                      r.autoValidated ? "text-blue-600 font-bold" :
                      r.validated ? "text-green-600 font-bold" :
                      "text-red-600 font-bold"
                    }>
                      {r.autoValidated ? "Auto-Validated 🤖" : r.validated ? "Validated ✅" : "Pending ❌"}
                    </span>
                  </Popup>
                </Marker>
              ) : null
            )}
          </MarkerClusterGroup>

          <FitBounds reports={reports} />
        </MapContainer>
      </div>

      {/* Reports Over Time Chart */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="font-bold mb-2">Reports Over Time</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#16a34a" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Table of Reports */}
      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <h2 className="font-bold mb-2">All Reports</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-2">Status</th>
              <th className="p-2">Reporter</th>
              <th className="p-2">Category</th>
              <th className="p-2">Date</th>
              <th className="p-2">Description</th>
              <th className="p-2">Photo</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(r => (
              <tr key={r.id} className="border-b hover:bg-green-50">
                <td className="p-2">
                  <span className={
                    r.autoValidated ? "text-blue-600 font-bold" :
                    r.validated ? "text-green-600 font-bold" :
                    "text-red-600 font-bold"
                  }>
                    {r.autoValidated ? "Auto-Validated " : r.validated ? "Validated ✅" : "Pending ❌"}
                  </span>
                </td>
                <td className="p-2">{r.userEmail || "Anonymous"}</td>
                <td className="p-2">{r.category}</td>
                <td className="p-2">{r.timestamp?.toDate().toLocaleDateString() || "-"}</td>
                <td className="p-2">{r.description || "—"}</td>
                <td className="p-2">
                  {r.photoURL ? (
                    <img src={r.photoURL} alt="report" className="w-16 h-16 object-cover rounded" />
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
