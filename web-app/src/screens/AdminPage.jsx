import * as React from "react";
import Dashboard from "../components/Admin/Dashboard";
import { UseAuth } from "../context/AuthConext";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();
  const user = localStorage.getItem("User");
  // console.log("user = " + JSON.parse(user).status);
  React.useEffect(() => {
    if (JSON.parse(user).status === "ResearcherLogin") {
      navigate("/");
    }
  }, []);
  return (
    <section>
      <Dashboard />
    </section>
  );
}
