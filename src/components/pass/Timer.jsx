import React from 'react';
export class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            time: this.props.intmin,
            seconds: null
        }
        this.secondsRemaining = this.state.time * 60;
    }

    tick(){
        let min = Math.floor(this.secondsRemaining / 60);
        let sec = (this.secondsRemaining) - (min * 60);

        this.setState({
            minutes: min,
            seconds: sec
        })

        if (sec < 10){
            this.setState({
                seconds: "0" + this.state.seconds,
            })

        }
        if (min === 0 & sec === 0){
            clearInterval(this.intervalHandel);
        }
        this.secondsRemaining--;

    }

    startTimer(){
        this.intervalHandel = setInterval(this.tick, 1000);
    }

    render(){
        //this.startTimer();
        return(
            <div>
                <h1> TEST TEST TEST </h1>
            </div>

        );
    }
}