import React from 'react';
import ReactDOM from "react-dom";
import { AdminTabs } from "./components/admin/adminTabs.jsx";
import { NavBar } from "./components/navBar.jsx";

class Admin extends React.Component{

    render() {
        return(
          <div>
  			<p className="flashpass">
	             FlashPassEDU
  			</p>
              <NavBar authed='true'/>
            <AdminTabs/>

          </div>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<Admin/>, app);