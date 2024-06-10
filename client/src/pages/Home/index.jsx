import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/react.svg"; // Adjust the path to your uploaded image

export default function Home() {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Save your thoughts, wherever you are
        </h1>
        <Link to="/notes">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Try NoteApp
          </button>
        </Link>
      </div>
      <footer className="relative z-10 p-4 bg-gray-200 bg-opacity-70 text-center w-full">
        <p className="text-gray-600">
          &copy; 2024 NoteApp. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
