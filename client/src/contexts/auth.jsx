import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("token") || null);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token);
    }
  }, []);

  const registerUser = async (userData) => {
    const res = await fetch(`${apiUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    if (data.success) {
      setUser(data.token);
      localStorage.setItem("token", data.token);
      toast.success("Registration successful!");
    } else if (!data.success) {
      toast.error(data.msg);
    }
  };

  const loginUser = async (userData) => {
    const res = await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    if (data.success) {
      setUser(data.token);
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
    } else if (!data.success) {
      toast.error(data.msg);
    }
  };

  const logoutUser = async () => {
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logout successful!");
  };

  const contextData = {
    user,
    loginUser,
    registerUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
