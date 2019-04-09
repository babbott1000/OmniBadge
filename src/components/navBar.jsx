import React from 'react';
import Nav from "react-bootstrap/Nav";

//TODO: Add logout


export class NavBar extends React.Component {



    render() {

        return (
            <div>
                <Nav>
                    <Nav.Item>
                        <Nav.Link href="/home">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/newOrg">Create Organization</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/auth">Login</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        );
    }
}