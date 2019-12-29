import React from 'react';
import ReactDOM from "react-dom";
import { NavBar } from "./components/NavBar.jsx";
import { Footer } from "./components/Footer.jsx";


class ErrorNotFound extends React.Component{
//this is the 404 page that is direvted to when the client trys to find a page that we do not have
    render() {
        let wrongPath = window.location.pathname;
        return(
            <div>
                <NavBar/>
                <div className="notFound">
                    <h1>404</h1>
                    <h2>The page you were looking for cannot be found.  Try navigating to another page using the links above.</h2>
                    <div className="footerSpacer"></div>
                </div>
                <Footer/>
            </div>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<ErrorNotFound/>, app);