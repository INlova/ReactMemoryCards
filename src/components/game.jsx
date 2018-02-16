import React from "react";

import Board from "./board";
import InfoPanel from "./info-panel";
import Footer from "./footer-panel";
import Result from "./result";
import LevelSelection from "./level-selection";

import { getLevelSettings } from "../helpers/level-settings"
import { infoTickDuration as tickDuration }  from "../helpers/timer-settings";

class Game extends React.Component {
    
    constructor(props) {
        super(props);

        this.timer = null;
        this.levelSettings = null;

        this.state = {
            level: 0,
            difficulty: null,
            score: 0,
            duration: 0
        };

        this.incrementScore = this.incrementScore.bind(this);
        this.handleTick = this.handleTick.bind(this);
        this.selectLevel = this.selectLevel.bind(this);
        this.newGame = this.newGame.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    isLevelSelecting() {
        return !this.state.difficulty;
    }

    isGameCompleted() {
        return !!this.state.difficulty && 
                 this.state.score === this.levelSettings.maxScore;
    }

    incrementScore() {
        this.setState((prevState) => ({ score: prevState.score + 1 }));
        if (this.isGameCompleted()) {
            this.stopTimer();
        }
    }

    newGame() {
        this.stopTimer();
        this.setState((prevState) => ({
            level: prevState.level + 1,
            difficulty: null,
            score: 0,
            duration: 0
        }));
    }

    resetGame() {
        this.setState((prevState) => ({
            level: prevState.level + 1,
            score: 0,
            duration: 0
        }));
    }

    selectLevel(difficulty) {
        this.levelSettings = getLevelSettings(difficulty);
        const newLevel = this.state.level + 1;

        this.setState({
            score: 0,
            difficulty: difficulty,
            level: newLevel,
            duration: 0
        });

        this.startTimer();
    }

    handleTick() {
        const newDuration = this.state.duration + tickDuration;
        this.setState({duration : newDuration});
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    startTimer() {
        this.stopTimer();
        this.timer = setInterval(
            this.handleTick,
            tickDuration);
    }

    stopTimer() {
        if (!!this.timer) {
            clearInterval(this.timer);
        }
    }

    render() {
        if (this.isLevelSelecting()) {
            return (<LevelSelection onLevelSelected = { this.selectLevel } />);
        }
        if (this.isGameCompleted()) {
            return (<Result {...this.state} onLevelSelected = { this.selectLevel } />);
        }
        console.log("render game");
        return (
            <div className="game">
                <InfoPanel {...this.state} 
                            newGame = { this.newGame }
                            resetGame = { this.resetGame}
                />
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