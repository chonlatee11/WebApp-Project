import * as React from "react";
import Dashboard from "../components/Research/Dashboard";
import { useNavigate } from "react-router-dom";

export default function ResearcherPage() {
  const navigate = useNavigate();
  const user = localStorage.getItem("User");
  // console.log("user = "+ JSON.parse(user).status);
  React.useEffect(() => {
  if (JSON.parse(user).status === "AdminLogin") {
    navigate("/");
  }
}
  , []);
  return <section>{<Dashboard />}</section>;
}
