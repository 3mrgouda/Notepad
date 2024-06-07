import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/register";
import Login from "./pages/login";
import PrivateRoutes from "./utils/PrivateRoutes";
import Notes from "./pages/Notes";

export default function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route element={<PrivateRoutes />}>
        <Route path="/notes" element={<Notes />}/>
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
