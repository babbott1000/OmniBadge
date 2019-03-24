import React from 'react';

//<br>{this.getTime(newDate)}</br>
//                 <br>{this.getDate(newDate)}</br>
export class Timedate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curTime: null,
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
            <View>
                <Text>Date: {this.state.curTime}</Text>
            </View>
        );
    }
}