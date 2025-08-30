import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth"; 

function ReportForm() {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [category, setCategory] = useState("cutting");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [submitting, setSubmitting] = useState(false);

  // Track user authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    }); 
    return () => unsubscribe();
  }, []);

  // Get user's geolocation
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        (err) => reject(err)
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo) {
      setStatus(" Please upload a photo before submitting.");
      return;
    }

    setSubmitting(true);
    setStatus("Submitting...");

    try {
      const loc = await getLocation();
      setLocation(loc);

      // Upload photo to Cloudinary
      const formData = new FormData();
      formData.append("file", photo);
      formData.append("upload_preset", "reports"); // your Cloudinary preset

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/ddddhtyr9/image/upload`, // your Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      const photoURL = data.secure_url;

      // Save report to Firestore
      await addDoc(collection(db, "reports"), {
  category,
  description,
  photoURL,
  lat: loc.lat,
  lng: loc.lng,
  timestamp: Timestamp.now(),
  userId: user.uid,
  userEmail: user.email,
  userName: user.displayName || "Anonymous",
});



      setStatus("✅ Report submitted successfully!");
      setPhoto(null);
      setCategory("cutting");
      setDescription("");
      setLocation({ lat: "", lng: "" });
    } catch (error) {
      console.error(error);
      setStatus(" Error submitting report.");
    } finally {
      setSubmitting(false);
    }
  };

  // Show Sign Up / Log In links if user not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-6">
        <p className="text-center text-red-600 text-lg mb-4">
           You must be logged in to submit a report.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/signup"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (

    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
           Report Mangrove Incident
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="cutting">Illegal Cutting</option>
              <option value="dumping">Dumping</option>
              <option value="reclamation">Land Reclamation</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you observed..."
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {location.lat && location.lng && (
            <p className="text-sm text-gray-600">
              Location: Lat {location.lat.toFixed(5)}, Lng {location.lng.toFixed(5)}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 font-bold rounded-lg shadow-lg text-white transition duration-300 ease-in-out transform hover:scale-105 ${
              submitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Report"}
          </button>
           {/* 🔐 Logout button after submit */}
          <button
            type="button"
            onClick={() => signOut(auth)}
            className="w-full mt-4 py-3 font-bold rounded-lg shadow-lg text-white bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Logout
          </button>
        </form>

        {status && (
          <p className={`mt-4 text-center font-medium ${status.includes("✅") ? "text-green-600" : "text-red-600"}`}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
}

export default ReportForm;
