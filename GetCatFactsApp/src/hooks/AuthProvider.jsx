import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  
  const CheckIfAuthenticated = (token) => {

    const storedToken = localStorage.getItem('token');
    return storedToken ? true : false;
};

  const loginAction = async (loginData) => {
    try {

      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const res = await response.json();

      if(!res.userData) {
        throw new Error(res.message);
      }

      localStorage.setItem('token', res.token);
      localStorage.setItem('userData', res.token);

      navigate("/")
      
    } catch (err) {

      console.error(err);

      alert(err)

    }
  };

  const logOut = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ CheckIfAuthenticated, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};