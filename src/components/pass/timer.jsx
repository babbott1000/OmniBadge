import React from 'react';

//TODO, get time from cookie, assume it will be in a cookie called "time-remaining"

export class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: ''
        }
        this.secondsRemaining = this.props.time;
        this.tick = this.tick.bind(this);
        this.intervalHandle;
        this.backgroundColor = 'green';
    }

    tick() {

        if (this.secondsRemaining == 0) {
            clearInterval(this.intervalhand);
            this.backgroundColor = 'red';
        }

        this.setState({
            seconds: this.secondsRemaining % 60
        })

        if (this.secondsRemaining % 60 < 10){
            this.setState({
                seconds: '0' + this.secondsRemaining.toString() % 60
            });
        }

        this.secondsRemaining--;
    }

    componentDidMount() {
        this.tick();
        this.intervalhand = setInterval(this.tick, 1000);
    }


    render() {
        document.body.style.backgroundColor = this.backgroundColor;
        return (
            <div>
                <h1>{Math.floor(this.secondsRemaining / 60)}:{this.state.seconds}</h1>
            </div>

        );
    }

}