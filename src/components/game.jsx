import React from "react";
import PropTypes from "prop-types";

import Board from "./board";
import InfoPanel from "./info-panel"
import { Result } from "./result";


import { getLevelSettings } from "../helpers/level-settings"

const timerDelay = 1000;

class Game extends React.Component {
    
    constructor(props) {
        super(props);

        this.timer = null;
        this.levelSettings = getLevelSettings(props.difficulty);

        this.state = {
            level: 0,
            score: 0,
            hints: this.levelSettings.hints,
            duration: 0
        };

        this.incrementScore = this.incrementScore.bind(this);
        this.handleTick = this.handleTick.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    incrementScore() {
        this.setState((prevState) => ({ score: prevState.score + 1 }));
    }

    resetGame(difficulty) {
        this.levelSettings = getLevelSettings(difficulty);
        const newLevel = this.state.level + 1;

        this.setState({
            score: 0,
            hints: levelSettings.hints,
            level: newLevel,
            duration: 0
        });
    }

    handleTick() {
        const newDuration = this.state.duration + timerDelay;
        this.setState({duration : newDuration});
    }

    componentDidMount() {
        this.timer = setInterval(
            this.handleTick,
            timerDelay);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.difficulty !== this.props.difficulty) {
            this.resetGame();
        }
    }

    render() {
        if (this.state.score === this.levelSettings.maxScore) {
            return (<Result {...this.state} />);
        }
        return (
            <div className="game">
                <InfoPanel {...this.state} />
                <Board
                    level = { this.state.level }
                    size={ this.levelSettings.boardSize }
                    onCardsMatched = {this.incrementScore}
                />
            </div>
        );
    }
}

Board.propTypes = {
    difficulty: PropTypes.string
}

export default Game;