/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem("token")));

  useEffect(() => {
    setIsAuthenticated(Boolean(token));
  }, [token]);

  const login = (userData, userToken, rememberMe) => {
    setUser(userData);
    setToken(userToken);
    setIsAuthenticated(true);
    if (rememberMe) {
      localStorage.setItem("token", userToken);
    } else {
      localStorage.removeItem("token");
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
