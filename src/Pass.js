import React from 'react';
import ReactDOM from "react-dom";
import { TimeDate } from "./components/pass/timeDate.jsx";
import { Timer } from "./components/pass/timer.jsx";
import { Person } from "./components/pass/person.jsx";

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