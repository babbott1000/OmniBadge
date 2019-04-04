import React from 'react';
import { TabUI } from "./admin/TabUI.jsx";
import { NavBar } from "./admin/navBar.jsx";

//TODO: ?

export class Admin extends React.Component{

    render() {
        return(
          <div>
              <NavBar/>
            <TabUI/>

          </div>
        );
    }
}