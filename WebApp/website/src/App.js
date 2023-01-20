import React from "react";
import './css/App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListADMIN from "./page/ListADMIN";
import ListResearch from "./page/ListResearch";
import ListSugarcane from "./page/ListSugarcane";
import History from "./page/HistoryPage";
import FormComponent from "./LOGIN";
import AuthenAdmin from "./component/AuthenAdmin";

const token = localStorage.getItem('token');

const App = () => {
    console.log(token)
    console.log(token === undefined)
    return(
        <BrowserRouter>
                <Routes> 
                    
                        
                        <Route path="/AuthenAdmin" element = {<AuthenAdmin/>}/>
                        <Route path="/ListADMIN" element = {<ListADMIN/>}/>
                        <Route path="/ListResearch" element = {<ListResearch/>}/>
                        <Route path="/ListSugarcane" element = {<ListSugarcane/>}/>
                        <Route path="/History" element = {<History/>}/>
                        <Route path="/" element = {<FormComponent/>}/>
                    
                    
                         
                    
                    
                </Routes>
        </BrowserRouter>
    )
}



export default App;