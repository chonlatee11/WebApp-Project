import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [userLogin, setuserLogin] = useState([]);
  let user = { email: "", role: "", token: "", AdminID: "" };
  const navigate = useNavigate();

  async function login(email, password, role) {
    if (role === "admin") {
      await axios
        .post("http://localhost:3031/loginADMIN", {
          email: email,
          password: password,
          role: role,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === "AdminLogin") {
            setuserLogin({
              email: res.data.email,
              role: role,
              token: res.data.token,
              AdminID: res.data.AdminID,
            });
            localStorage.setItem("User", JSON.stringify(userLogin));
            navigate("/AdminPage");
          } else {
            navigate("/");
          }
        });
    } else if (role === "researcher") {
      await axios
        .post("http://localhost:3031/ResearcherLogin", {
          Email: email,
          passWord: password,
          role: role,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === "ResearcherLogin") {
            setuserLogin({
              email: res.data.email,
              role: role,
              token: res.data.token,
              ReseachID: res.data.ReseachID,
            });
            localStorage.setItem("User", JSON.stringify(userLogin));
            navigate("/ResearcherPage");
          } else {
            navigate("/");
          }
        });
    }
  }

  const logout = () => {
    setuserLogin({});
    localStorage.removeItem("User");
    user = {};
    navigate("/");
  };

  useEffect(() => {
    if (userLogin) {
      localStorage.setItem("User", JSON.stringify(userLogin));
    }
  }, [userLogin]);

  return (
    <AuthContext.Provider value={{ userLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  return useContext(AuthContext);
};
