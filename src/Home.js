//TODO: Add carousel of pictures(random ones for now)(bootstrap carousel)

import React from 'react';
import ReactDOM from "react-dom";
import { TabUI } from "./components/admin/TabUI.jsx";
import { NavBar } from "./components/navBar.jsx";

class Home extends React.Component{

    render() {
        return(
          <div>
  			<p className="flashpass">
	             FlashPassEDU
  			</p>
            <NavBar authed='false'/>

          </div>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<Home/>, app);