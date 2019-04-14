import React from 'react';
import ReactDOM from "react-dom";
import {Timedate} from "./components/pass/Timedate.jsx";
import {Timer} from "./components/pass/Timer.jsx";
import {Person} from "./components/pass/Person.jsx";

class Pass extends React.Component{

    render() {
        return(
            <div>
                <p className="flashpass">
                    FlashPassEDU
                </p>

                <Timedate/>
                <Timer/>
                <Person/>
            </div>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<Pass/>, app);