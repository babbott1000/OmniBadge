import React from 'react';

//TODO: Add real tabs
//TODO: Style
//TODO: Add icons from Font Awesome, https://fontawesome.com

import Tabs from 'react-bootstrap/Tabs';
import Tab from "react-bootstrap/Tab";
import { Students } from "./students.jsx";
import { PassLog } from "./passLog.jsx";

export class AdminTabs extends React.Component{

    render() {
        return(
          <div>
              <Tabs defaultActiveKey="home">
                  <Tab eventKey="home" title="Home">
                      <h1> Test </h1>
                  </Tab>
                  <Tab eventKey="history" title="Pass Log">
                      <PassLog/>
                  </Tab>
                  <Tab eventKey="students" title="Students">
                       <Students/>
                  </Tab>

              </Tabs>
          </div>
        );
    }
}