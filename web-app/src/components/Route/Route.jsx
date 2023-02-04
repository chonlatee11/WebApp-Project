import { Routes, Route } from "react-router-dom";
import AdminPage from "../../screens/AdminPage";
import ResearcherPage from "../../screens/ResearcherPage";
import Signin from "../../screens/Signin";
import { UseAuth } from "../../context/AuthConext";
const RouterPage = () => {
  const { userLogin } = UseAuth();
  // console.log(userLogin.user === null);
  return (
    <Routes>
      {userLogin.user === null ? (
        <>
          <Route path="/" element={<Signin />} />
          <Route path="/Signin" element={<Signin />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Signin />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/ResearcherPage" element={<ResearcherPage />} />
        </>
      )}
      {/* <Route path="/" element={<Signin />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/AdminPage" element={<AdminPage />} />
      <Route path="/ResearcherPage" element={<ResearcherPage />} /> */}
    </Routes>
  );
};
export default RouterPage;
