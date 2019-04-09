import React from 'react';
import ReactDOM from "react-dom";
import { TabUI } from "./components/admin/TabUI.jsx";
import { NavBar } from "./components/navBar.jsx";

class Admin extends React.Component{

    render() {
        return(
          <div>
  			<p className="flashpass">
	             FlashPassEDU
  			</p>
              <NavBar/>
            <TabUI/>

          </div>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<Admin/>, app);