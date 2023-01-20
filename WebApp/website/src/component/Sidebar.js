import React, {useState } from "react";
import{FaBars, FaCommentAlt, FaRegChartBar, FaTh, FaUserAlt,} from "react-icons/fa"
import { NavLink } from "react-router-dom";
import '../css/App.css'

const Sidebar = ({children}) => {
    const[isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem = [
        {
          path:"/ListADMIN",
          name:"ข้อมูลผู้ดูแลระบบ",
          icon:<FaTh/>
        },
        {
          path:"/ListResearch",
          name:"ข้อมูลนักวิจัย",
          icon:<FaUserAlt/>
        },
        {
          path:"/ListSugarcane",
          name:"ข้อมูลโรคอ้อย",
          icon:<FaRegChartBar/>
        },
        {
          path:"/History",
          name:"ประวัติการแก้ไขข้อมูล",
          icon:<FaCommentAlt/>
        },
    ]
    return(
        <div class="container">
          <div style={{width: isOpen ? "300px" : "50px"}} className="sidebar">
              <div className="top_section">
                  <h1 style={{display: isOpen ? "block" : "none"}} className="logo">LOGO</h1>
                  <div style={{marginLeft: isOpen ? "110px" : "0px"}} className="bars">
                    <FaBars onClick={toggle}/>
                  </div>
              </div>
              {
                menuItem.map((item, index)=>(
                  <NavLink to={item.path} key={index} className="link" activeclassName="active">
                      <div className="icon">{item.icon}</div>
                      <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                  </NavLink>
                ))
              }
          </div>
          <main>{children}</main>
        </div>
    );
};

export default Sidebar;