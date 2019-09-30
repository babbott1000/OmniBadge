import React from 'react';
import ReactDOM from "react-dom";
import {Footer} from "./components/footer.jsx";


class ErrorNotFound extends React.Component{
//this is the 404 page that is direvted to when the client trys to find a page that we do not have
    render() {
        let wrongPath = window.location.pathname;
        return(
            <div className="notFound">
                <div className="wrapper">
                    <h1 className="glitch">404</h1>
                </div>
            </div>

        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<ErrorNotFound/>, app);