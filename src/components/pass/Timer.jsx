import React from 'react';

export class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: ''


        }
        this.secondsRemaining = this.props.time;
        this.tick = this.tick.bind(this);
        this.intervalHandle;

    }

    tick() {
        this.setState({
            seconds: this.secondsRemaining % 60
        })
        if (this.secondsRemaining < 10){
            this.setState({
                seconds: '0' + this.secondsRemaining.toString()
            })
        }
        else if (this.secondsRemaining === 0) {
            clearInterval(this.intervalhand)
        }


        this.secondsRemaining--;

    }

    componentDidMount() {
        this.tick()
        this.intervalhand = setInterval(this.tick, 1000)


    }


    render() {

        return (
            <div>
                <h1>{Math.floor(this.secondsRemaining / 60)}:{this.state.seconds}</h1>
            </div>

        );
    }

}