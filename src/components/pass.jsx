import React from 'react';
import { Person } from "./pass/person.jsx";
import { TimeDate } from "./pass/timeDate.jsx";
import { Timer } from "./pass/timer.jsx";

//TODO: Style, dynamically set time from cookie

export class Pass extends React.Component {
    render() {
        return(
            <div>
                <Person firstName={"Jack"} lastName={"Smith"} room={"Mr. Spring"} />
                <TimeDate/>
                <Timer time={10}/>

            </div>

        );
    }
}