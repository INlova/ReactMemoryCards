import React from "react";
import Board from "./board";
import InfoPanel from "./info-panel"

class Game extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            hints: 0
        };

        this.incrementScore = this.incrementScore.bind(this);
    }

    incrementScore() {
        this.setState((prevState) => ({ score: prevState.score + 1 }));
    }

    render() {
        return (
            <div className="game">
                
                <InfoPanel
                    score = {this.state.score}
                    hints = {this.state.hints}
                />
                <Board
                    size={{ width: 4, height: 2 }}
                    onTick = {this.handleTick}
                    onCardsMatched = {this.incrementScore}
                />
            </div>
        );
    }
}

export default Game;