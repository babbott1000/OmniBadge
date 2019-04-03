import React from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from "react-bootstrap/Tab";
import {Studnetstb} from "./Studnetstb.jsx";
import {Histoy} from "./Histoy.jsx";

export class TabUI extends React.Component{

    render() {
        return(
          <div>
              <Tabs defaultActiveKey="home">
                  <Tab eventKey="home" title="Home">
                      <h1> Test </h1>
                  </Tab>
                  <Tab eventKey="history" title="History">
                      <Histoy/>
                  </Tab>
                  <Tab eventKey="students" title="Students">
                       <Studnetstb/>
                  </Tab>

              </Tabs>
          </div>
        );
    }
}