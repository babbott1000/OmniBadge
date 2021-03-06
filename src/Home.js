//TODO: Add carousel of pictures(random ones for now)(bootstrap carousel)

import React from 'react';
import ReactDOM from "react-dom";
import { NavBar } from "./components/NavBar.jsx";
import { Footer } from "./components/Footer.jsx";


class Home extends React.Component{
//This is the home page and this is what the client goes to when they go to /
    render() {
        return(
            <div>
                <NavBar authed="false"/>
                <h1 className="header">OmniBadge</h1>
                <div className="footerSpacer"></div>
                <Footer/>
            </div>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<Home/>, app);