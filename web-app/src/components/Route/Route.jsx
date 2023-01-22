import {  Routes, Route } from "react-router-dom";
import AdminPage from '../../screens/AdminPage'
import ResearcherPage from '../../screens/ResearcherPage'
import Signin from '../../screens/Signin'

 const RouterPage = () => {
    return (
            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/Signin" element={<Signin />} />
                <Route path="/AdminPage" element={<AdminPage />} />
                <Route path="/ResearcherPage" element={<ResearcherPage />} />
            </Routes>
    )
}
export default RouterPage;