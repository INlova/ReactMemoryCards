import React from "react";
import Board from "./board";

class Game extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            hints: 0,
            duration: 0
        };

        this.incrementScore = this.incrementScore.bind(this);
        this.handleTick = this.handleTick.bind(this);
    }

    incrementScore() {
        this.setState((prevState) => ({ score: prevState.score + 1 }));
    }

    handleTick(tick) {
        this.setState((prevState) => ({ duration: prevState.duration + tick }));
    }

    render() {
        return (
            <div>
                <div> <p>Time : {Math.floor(this.state.duration / 1000)}</p>
                      <p>Score : {this.state.score }</p>
                      <p>Hints: {this.state.hints }</p>
                </div>
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