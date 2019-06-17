import React from 'react';

//TODO: Style

export class TimeDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toLocaleString(),
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                date: new Date().toLocaleString()
            })
        }, 1000)
    }

    render() {
        return (
            <h1>
                <p>Date: {this.state.date}</p>
            </h1>
        );
    }
}