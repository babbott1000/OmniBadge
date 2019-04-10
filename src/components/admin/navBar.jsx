import React from 'react';
import Nav from "react-bootstrap/Nav";

//TODO:

export class NavBar extends React.Component{
    render() {
        return (
            <div>
                <Nav
                    activeKey="/home"
                >
                    <Nav.Item>
                        <Nav.Link href="https://google.com">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/logout">Log out</Nav.Link>
                    </Nav.Item>

                </Nav>
            </div>
        );
    }
}