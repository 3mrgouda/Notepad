import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/register";
import Login from "./pages/login";
import PrivateRoutes from "./utils/PrivateRoutes";
import Notes from "./pages/Notes";

export default function App() {
  const { user } = useAuth();
  return (
    <div>
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/notes" element={<Notes />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </div>
  );
}
