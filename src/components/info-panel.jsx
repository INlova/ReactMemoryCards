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

    componentWillReceiveProps(nextProps) {
        const duration = nextProps.duration / 1000;
        const seconds = duration % 60;
        const minutes = (duration - seconds) / 60;
        this.setState({
            seconds: seconds,
            minutes: minutes
        });
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.seconds !== nextState.seconds) ||
               (this.state.minutes !== nextState.minutes);
    }

    render() {
        const { seconds, minutes } = this.state;
        const formattedSeconds = seconds > 9 ? seconds : `0${seconds}`; 
        const formattedMinutes = minutes > 9 ? minutes : `0${minutes}`; 
        return (
            <div className="info-panel">
                <span className="item score">Score : {this.props.score}</span>
                <span className="item time">Total time {formattedMinutes} : {formattedSeconds}</span>
                <span className="item reset">
                    <button onClick={this.props.newGame}>New game</button>
                </span>
            </div>
        );
    }
};

InfoPanel.propTypes = {
    score: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    resetGame: PropTypes.func.isRequired,
    newGame: PropTypes.func.isRequired
};

export default InfoPanel;