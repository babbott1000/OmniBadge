import React from 'react';


export class Timedate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curTime: new Date().toLocaleString(),
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                curTime: new Date().toLocaleString()
            })
        }, 1000)
    }

    render() {
        return (
            <h1>
                <p>Date: {this.state.curTime}</p>
            </h1>
        );
    }
}