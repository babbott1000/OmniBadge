import React from 'react';
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
                <p>
                    <h1 className="person"> This is {this.state.firstName} {this.state.lastName}, from {this.state.classroom} </h1>
                </p>
            </div>
        );
    }
}