import React from 'react';
import {TabUI} from "./admin/TabUI.jsx";
import {Nav_bar} from "./admin/Nav_bar.jsx";

export class Admin extends React.Component{

    render() {
        return(
          <div>
              <Nav_bar/>
            <TabUI/>

          </div>
        );
    }
}