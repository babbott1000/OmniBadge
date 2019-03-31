import React from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from "react-bootstrap/Tab";

export class TabUI extends React.Component{

    render() {
        return(
          <div>
              <Tabs defaultActiveKey="home">
                  <Tab eventKey="home" title="Home">
                      <h1> Test </h1>
                  </Tab>
                  <Tab eventKey="profile" title="Profile">
                      <h1> Test </h1>
                  </Tab>
                  <Tab eventKey="contact" title="Contact">
                      <h1> Test </h1>
                  </Tab>
              </Tabs>
          </div>
        );
    }
}