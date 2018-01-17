import React from "react";

class InfoPanel extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            minutes: 0
        }

        this.timer = null;
        this.handleTick = this.handleTick.bind(this);
    }

    handleTick() {
        let { seconds, minutes} = this.state;
        
        seconds = seconds + 1;

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        this.setState({
            seconds: seconds,
            minutes: minutes
        });
    }

    componentDidMount() {
        this.timer = setInterval(
            this.handleTick,
            1000);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    render() {
        const { seconds, minutes } = this.state;
        const formattedSeconds = seconds > 9 ? seconds : `0${seconds}`; 
        const formattedMinutes = minutes > 9 ? minutes : `0${minutes}`; 
        return (
            <div className="info-panel">
                <span className="item"> Score : {this.props.score }</span>
                <span className="item">Time : {formattedMinutes} : {formattedSeconds}</span>
                <span className="item">Hints: {this.props.hints }</span>
            </div>
        );
    }
}

export default InfoPanel;