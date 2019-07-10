import React from 'react';

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

                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">BytePass</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#myNavbar" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="myNavbar">

                        <ul className="ml-auto navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Login</a>
                            </li>
                            <li className="nav-item side">
                                <a className="nav-link" href="#">Register</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
