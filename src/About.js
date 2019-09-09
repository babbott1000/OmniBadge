import React from 'react';
import ReactDOM from "react-dom";
import {Aboutus, ThePeople} from "./components/about/thePeople.jsx";
import {TheProject} from "./components/about/theProject.jsx";
import {ThePersona} from "./components/about/thePersona.jsx";

class About extends React.Component{

    render() {H
        return(
            <div>
                <h1> The project </h1>
                <TheProject/>
                <h1> The people </h1>
                <ThePeople/>
                <h1> The persona </h1>
                <ThePersona/>

            </div>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<About/>, app);