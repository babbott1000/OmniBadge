import React from 'react';
import Nav from "react-bootstrap/Nav";


export class NavBar extends React.Component {


    constructor(props) {
        super(props);

        if(props.authed != 'true') {
            this.button = (<Nav.Item>
                <Nav.Link href="/auth">Login</Nav.Link>
            </Nav.Item>)
        } else {
            this.button = (<Nav.Item>
                <Nav.Link href="/logout">Logout</Nav.Link>
            </Nav.Item>)
        }
    }

    render() {

        return (
            <div>
                <Nav>
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/newOrg">Create Organization</Nav.Link>
                    </Nav.Item>
                    { this.button }
                </Nav>
            </div>
        );
    }
}