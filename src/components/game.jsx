import React from "react";

import Board from "./board";
import InfoPanel from "./info-panel";
import Footer from "./footer-panel";
import Result from "./result";
import LevelSelection from "./level-selection";

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
            duration: 0
        };

        this.incrementScore = this.incrementScore.bind(this);
        this.handleTick = this.handleTick.bind(this);
        this.selectLevel = this.selectLevel.bind(this);
    }

    isLevelSelecting() {
        return this.state.level === 0;
    }

    isGameCompleted() {
        return this.state.score === this.levelSettings.maxScore;
    }

    incrementScore() {
        this.setState((prevState) => ({ score: prevState.score + 1 }));
    }

    selectLevel(difficulty) {
        this.levelSettings = getLevelSettings(difficulty);
        const newLevel = this.state.level + 1;

        this.setState({
            score: 0,
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
            this.resetGame(nextProps.difficulty);
        }
    }

    render() {
        if (this.isLevelSelecting()) {
            return (<LevelSelection onLevelSelected = { this.selectLevel } />);
        }
        if (this.isGameCompleted()) {
            return (<Result {...this.state} onLevelSelected = { this.selectLevel } />);
        }
        return (
            <div className="game">
                <InfoPanel {...this.state} />
                <Board
                    level = { this.state.level }
                    size={ this.levelSettings.boardSize }
                    onCardsMatched = {this.incrementScore}
                />
                <Footer />
            </div>
        );
    }
}

export default Game;