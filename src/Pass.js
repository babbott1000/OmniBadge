import React from 'react';
import ReactDOM from "react-dom";
import { TimeDate } from "./components/pass/timeDate.jsx";
import { Timer } from "./components/pass/timer.jsx";
import { Person } from "./components/pass/person.jsx";

class Pass extends React.Component{
//this is the pass - no longer in use
    render() {
        return(
            <div>
                <div className="header">
                  <img src="/logo.png" id="logo"></img>
                  FlashPassEDU
                </div>

                <TimeDate/>
                <Timer time={10}/>
                <Person firstName={"Jack"} lastName={"Smith"} room={"Mr. Springer"} />
            </div>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<Pass/>, app);