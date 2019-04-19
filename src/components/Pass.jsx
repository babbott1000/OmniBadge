import React from 'react';
import { Person } from "./pass/person.jsx";
import { Timedate } from "./pass/timedate.jsx";
import { Timer } from "./pass/timer.jsx";

//TODO: Style, dynamically set time from cookie

export class Pass extends React.Component {
    render() {
        return(
            <div>
                <Person firstName={"Jack"} lastName={"Smith"} room={"Mr. Spring"} />
                <Timedate/>
                <Timer time={10}/>

            </div>

        );
    }
}