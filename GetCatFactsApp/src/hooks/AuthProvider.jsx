import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  function CheckIfAuthenticated() {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData === null) {
      return false;
    }
    setUserData(storedUserData);
    return true;
  }

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
      console.log("res", res)
      if (res.userData) {
        console.log("res", res.userData)
        setUserData(res.userData);
        localStorage.setItem("userData", JSON.stringify(res.userData));
        localStorage.setItem("token", res.token);
        navigate("/");
      }

      
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
      alert(err)
    }
  };

  const logOut = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ CheckIfAuthenticated, loginAction, logOut, userData }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};