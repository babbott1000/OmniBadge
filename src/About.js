import React from 'react';
import ReactDOM from "react-dom";
import {Aboutus, ThePeople} from "./components/about/thePeople.jsx";
import {TheProject} from "./components/about/theProject.jsx";
import {NavBar} from "./components/navBar.jsx";


class About extends React.Component {

    render() {

        return (
            <div>
                <NavBar/>

                <div>
                    <h1 className="aboutheader"> About us </h1>
                </div>
                <div>
                    <div>
                        <h1 className="aboutheader"> The project </h1>
                        <TheProject/>
                    </div>

                    <div>
                        <h1 className="aboutheader"> The people </h1>
                        <ThePeople/>
                    </div>
                </div>

            </div>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<About/>, app);