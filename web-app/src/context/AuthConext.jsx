import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [userLogin, setuserLogin] = useState({
    user: localStorage.getItem("User"),
  });
  let user = { email: "", role: "", token: "", AdminID: "" };
  const navigate = useNavigate();
  async function login(email, password, role) {
    if (role === "admin") {
      await axios
        .post("http://127.0.0.1:3031/loginADMIN", {
          email: email,
          password: password,
          role: role,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data.status === "AdminLogin") {
            setuserLogin({
              // email: res.data.email,
              // role: role,
              // token: res.data.token,
              // AdminID: res.data.AdminID,
              user: localStorage.setItem("User", JSON.stringify(res.data)),
            });
            // localStorage.setItem("User", );
            navigate("/AdminPage");
          } else {
            alert("เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบอีเมล์หรือรหัสผ่าน");
            location.reload();          
            navigate("/Signin");
          }
        });
    } else if (role === "researcher") {
      await axios
        .post("http://127.0.0.1:3031/ResearcherLogin", {
          Email: email,
          passWord: password,
          role: role,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data.status === "ResearcherLogin") {
            setuserLogin({
              user: localStorage.setItem("User", JSON.stringify(res.data)),
            });
            // localStorage.setItem("User", JSON.stringify(userLogin));
            navigate("/ResearcherPage");
          } if (res.data.status === 401) {
            alert("ไม่พบผู้ใช้งาน กรุณาติดต่อผู้ดูแลระบบ");
            location.reload();          
            navigate("/Signin");
          }
          if (res.data.status === 402) {
            alert("เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบอีเมล์หรือรหัสผ่าน");
            location.reload();          
            navigate("/Signin");
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

  // useEffect(() => {
  //   if (userLogin) {
  //     localStorage.setItem("User", JSON.stringify(userLogin));
  //   }
  // }, [userLogin]);

  return (
    <AuthContext.Provider value={{ userLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  return useContext(AuthContext);
};
