import React from 'react';
import {Person} from "./pass/Person.jsx";
import {Timedate} from "./pass/Timedate.jsx";
import {Timer} from "./pass/Timer.jsx";


export class Pass extends React.Component {
    render() {
        return(
            <div>
                <Person firstName={"Jack"} lastName={"Hammerlund"} classroom={"Spring"} />
                <Timedate/>
                <Timer/>
            </div>

        );
    }
}