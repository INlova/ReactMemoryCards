import React from "react";
import PropTypes from "prop-types";

class InfoPanel extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            minutes: 0
        }
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

    componentWillReceiveProps(nextProps) {
        const duration = nextProps.duration / 1000;
        const seconds = duration % 60;
        const minutes = (duration - seconds) / 60;
        this.setState({
            seconds: seconds,
            minutes: minutes
        });
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
};

InfoPanel.propTypes = {
    score: PropTypes.number.isRequired,
    hints: PropTypes.number.isRequired
};

export default InfoPanel;