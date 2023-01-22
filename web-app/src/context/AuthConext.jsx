import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [userLogin, setuserLogin] = useState({});
  let user = { email: "", role: "", token: "" };
  const navigate = useNavigate();

  console.log("userLogin = " + userLogin.token);


  async function login(email, password, role) {
      await axios.post("http://localhost:3031/loginADMIN", {
      email: email,
      password: password,
      role: role,
    }).then((res) => {
      console.log(res.data);
      if (res.data.status === "AdminLogin") {
        setuserLogin({
          email: res.data.user,
          role: role,
          token: res.data.token,
        });
        if (role === "admin") {
          navigate("/AdminPage");
        }
        if (role === "researcher") {
          navigate("/ResearcherPage");
        }
      } else {
        navigate("/");
      } 
    });
};

  const logout = () => {
    setuserLogin({});
    user = {};
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ userLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  return useContext(AuthContext);
};
