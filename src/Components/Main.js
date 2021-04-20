import React from 'react';
import "../App.css";
import {SidebarData} from './SidebarData.js';
import welcome from "./images/welcome.jpg";

function Main() {
    return (
        <div className="Main">
            <img src={welcome} />
        </div>
    ); 
}

export default Main;