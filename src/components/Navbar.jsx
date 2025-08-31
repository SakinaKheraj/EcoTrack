import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ import useNavigate
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function Navbar() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loadingRole, setLoadingRole] = useState(true);
  const navigate = useNavigate(); // ✅ initialize navigate

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoadingRole(true);

        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setRole(userDoc.data().role);
          } else {
            setRole(null);
          }
        } catch (err) {
          console.error("Failed to fetch user role:", err);
          setRole(null);
        } finally {
          setLoadingRole(false);
        }
      } else {
        setUser(null);
        setRole(null);
        setLoadingRole(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Sign out and redirect to home
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // Redirect to Home page
  };

  return (
    <nav className="bg-gradient-to-r from-green-700 to-green-500 text-white shadow-lg sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-extrabold tracking-tight">
             EcoTrack
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
                {!loadingRole && role === "community" && (
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
                  </>
                )}

                {!loadingRole && role === "admin" && (
                  <Link to="/authority-dashboard" className="hover:text-green-100 transition-colors duration-200">
                    Authority Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout} // ✅ use handleLogout
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
