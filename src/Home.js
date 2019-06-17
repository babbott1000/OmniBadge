//TODO: Add carousel of pictures(random ones for now)(bootstrap carousel)

import React from 'react';
import ReactDOM from "react-dom";
import { NavBar } from "./components/navBar.jsx";

class Home extends React.Component{

    render() {
        return(
          <div>
            <div className="header">
              <img src="/logo.png" id="logo"></img>
              FlashPassEDU
            </div>
            <NavBar authed='false'/>

          </div>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<Home/>, app);