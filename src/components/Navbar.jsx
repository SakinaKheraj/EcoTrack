import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-gradient-to-r from-green-700 to-green-500 text-white shadow-lg sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-extrabold tracking-tight">
            🌿 EcoTrack
          </div>

          {/* Links */}
          <div className="flex space-x-6 items-center text-lg">
            <Link to="/" className="hover:text-green-100 transition-colors duration-200">
              Home
            </Link>
            <Link to="/about" className="hover:text-green-100 transition-colors duration-200">
              About Us
            </Link>
            <Link to="/how-it-works" className="hover:text-green-100 transition-colors duration-200">
              How it Works
            </Link>

            {user ? (
              <>
                <Link to="/report" className="hover:text-green-100 transition-colors duration-200">
                  Report
                </Link>
                <Link to="/dashboard" className="hover:text-green-100 transition-colors duration-200">
                  Dashboard
                </Link>
                <Link to="/leaderboard" className="hover:text-green-100 transition-colors duration-200">
                  Leaderboard
                </Link>
                <button
                  onClick={() => signOut(auth)}
                  className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md transition-all duration-200 font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" className="hover:text-green-100 transition-colors duration-200">
                  Sign Up
                </Link>
                <Link to="/login" className="hover:text-green-100 transition-colors duration-200">
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
