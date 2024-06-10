import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import {useAuth} from "../contexts/auth";
export default function PrivateRoutes() {
  const { user } = useAuth();
  return  user ? <Outlet /> : <Navigate to="/login" />;
}
