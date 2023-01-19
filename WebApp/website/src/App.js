import React from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import ListHistoryEDIT from "./page/HistoryEDIT";
import ListADMIN from "./page/ListADMIN";
import ListResearch from "./page/ListResearch";
import ListSugarcane from "./page/ListSugarcane";

const App = () => {
    return(
        <BrowserRouter>
        <Sidebar>
        <Routes> 
            <Route path="/ListAdmin" element = {<ListADMIN/>}/>
            <Route path="/ListResearch" element = {<ListResearch/>}/>
            <Route path="/ListSugarcane" element = {<ListSugarcane/>}/>
            <Route path="/ListHistory" element = {<ListHistoryEDIT/>}/>
        </Routes>
        </Sidebar>
        </BrowserRouter>
    )
}

export default App;