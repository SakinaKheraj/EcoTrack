import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const reportsSnapshot = await getDocs(collection(db, "reports"));
      const usersSnapshot = await getDocs(collection(db, "users"));

      // Map userId -> userName
      const usersMap = {};
      usersSnapshot.forEach((doc) => {
      usersMap[doc.id] = doc.data().name || doc.data().email;
      });

      // Count reports per user
      const reportCounts = {};
      reportsSnapshot.forEach((doc) => {
        const data = doc.data();
        const uid = data.userId;
        if (!reportCounts[uid]) {
          reportCounts[uid] = { count: 0, name: usersMap[uid] || data.userEmail };
        }
        reportCounts[uid].count += 1;
      });

      // Convert to array & sort
      const leaderboardData = Object.values(reportCounts).sort((a, b) => b.count - a.count);
      setLeaders(leaderboardData);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">🌿 Leaderboard</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-3 text-left">Rank</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Reports</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((user, index) => (
              <tr key={index} className="border-b hover:bg-green-50">
                <td className="p-3 font-bold">{index + 1}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
