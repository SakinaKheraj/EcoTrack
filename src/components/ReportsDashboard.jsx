import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function ReportsDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const q = query(collection(db, "reports"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const reportsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReports(reportsData);
      } catch (error) {
        console.error("Error fetching reports: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <p className="text-center text-lg text-gray-600 mt-10">Loading reports...</p>;
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">🌍 Reports Dashboard</h2>
      {reports.length === 0 ? (
        <p className="text-center text-gray-600">No reports submitted yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-white shadow-lg rounded-xl p-4 border border-gray-200">
              <img
                src={report.photoURL}
                alt="Report"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-green-600 capitalize">{report.category}</h3>
              <p className="text-gray-700 mt-2">{report.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                📍 Lat: {report.lat.toFixed(3)}, Lng: {report.lng.toFixed(3)}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Submitted by: {report.userEmail}
              </p>
              <p className="text-sm text-gray-400">
                🕒 {new Date(report.timestamp.seconds * 1000).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportsDashboard;
