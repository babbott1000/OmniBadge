import React from 'react';
import ReactDOM from "react-dom";
import {Aboutus, ThePeople} from "./components/about/thePeople.jsx";
import {TheProject} from "./components/about/theProject.jsx";
import {NavBar} from "./components/navBar.jsx";


class About extends React.Component {

    render() {

        return (
            <div className="slideInLeft">
                <NavBar/>

                <div style ={{position: 'relative', top:'10px'}}>
                    <h1 className="header"> About us </h1>
                </div>
                <div style ={{position: 'relative', top:'310px'}}>
                    <div>
                        <h1 className="header"> The project </h1>
                        <TheProject className="abouttext"/>
                    </div>

                    <div style ={{position: 'relative', top:'110px'}}>
                        <h1 className="header"> The people </h1>
                        <ThePeople className="abouttext"/>

                    </div>
                </div>

            </div>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<About/>, app);