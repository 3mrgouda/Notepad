import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">
          <Link to="/" className="hover:text-gray-300">
            NoteApp
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          {user ? (
            <>
              <Link to="/notes" className="hover:text-gray-300">
                Notes
              </Link>
              <button
                onClick={logoutUser}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="hover:text-gray-300">
                Register
              </Link>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
