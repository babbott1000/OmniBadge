import React from 'react';

//TODO: Delete React.Componet part and use as a class for table, adding hyperlinks to their names going to "/student/someUniqueUserID"

export class Person extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            classroom: this.props.classroom

        }
    }

    render() {
        return(
            <div>

                    <h1 className="person"> This is {this.state.firstName} {this.state.lastName}, from {this.state.classroom} </h1>

            </div>
        );
    }
}