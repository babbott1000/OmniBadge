import React from 'react';

//TODO: Add real tabs
//TODO: Styole
//HINT: https://fontawesome.com

import Tabs from 'react-bootstrap/Tabs';
import Tab from "react-bootstrap/Tab";
import { Students } from "./Students.jsx";
import { History } from "./History.jsx";

export class TabUI extends React.Component{

    render() {
        return(
          <div>
              <Tabs defaultActiveKey="home">
                  <Tab eventKey="home" title="Home">
                      <h1> Test </h1>
                  </Tab>
                  <Tab eventKey="history" title="History">
                      <History/>
                  </Tab>
                  <Tab eventKey="students" title="Students">
                       <Students/>
                  </Tab>

              </Tabs>
          </div>
        );
    }
}