import React from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export class NavBar extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            auth: this.props.authed
        }


    }


    render() {

        return (
            <div>

                    <Nav fill variant="tabs" className="justify-content-center" >
                        <Nav.Item>
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/newOrg">Create Organization</Nav.Link>
                        </Nav.Item>

                        {this.state.auth == 'true' ? (<Nav.Item>
                            <Nav.Link href="/logout">Logout</Nav.Link>
                        </Nav.Item>) : (<Nav.Item>
                            <Nav.Link href="/auth">Login</Nav.Link>
                        </Nav.Item>)
                        }


                        {this.state.auth != 'true' && (<Nav.Item>
                            <Nav.Link href="/create">Sign up</Nav.Link>
                        </Nav.Item>)
                        }
                    </Nav>

            </div>
        );
    }
}