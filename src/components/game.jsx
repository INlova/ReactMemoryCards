import React from "react";
import Board from "./board";

class Game extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            hints: 0
        };

        this.incrementScore = this.incrementScore.bind(this);
        this.handleTick = this.handleTick.bind(this);
    }

    incrementScore() {
        this.setState({
            score: (this.score + 1)
        });
    }

    handleTick(duration) {
    }

    render() {
        return (
            <Board
                size={{ width: 4, height: 2 }}
                onTick = {this.handleTick}
            />
        );
    }
}

export default Game;