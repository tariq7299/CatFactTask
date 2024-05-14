import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(null)
  const [userData, setUserData] = useState(null)
  
  const getToken = () => {
    return localStorage.getItem('token');
  }
  
  const getUserData = () => {
    return localStorage.getItem('userData');
  }
  
  const checkIfAuthenticated = (token) => {

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
      console.log("res.userData", res.userData)
      localStorage.setItem('token', res.token);
      localStorage.setItem('userData', res.userData.username);

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
    <AuthContext.Provider value={{ getToken, checkIfAuthenticated, loginAction, logOut, getUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};