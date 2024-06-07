import { Outlet, Navigate } from "react-router-dom";
import React from "react";

export default function PrivateRoutes() {
  const user = false;
  return  user ? <Outlet /> : <Navigate to="/login" />;
}
