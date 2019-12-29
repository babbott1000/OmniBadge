import React from 'react';
import ReactDOM from "react-dom";
import { AdminTabs } from "./components/admin/adminTabs.jsx";
import { NavBar } from "./components/NavBar.jsx";

class Admin extends React.Component{

    render() {
        return(
            <div>
                <div className="header">
                    <img src="/logo.png" id="logo"></img>
                    FlashPassEDU
                </div>
                <NavBar authed='true'/>
                <AdminTabs/>

            </div>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<Admin/>, app);