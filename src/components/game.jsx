import React from "react";

const symbols = ["❄", "❅", "❆", "❉", "✴", "✼", "❃"];

function generateCards(width, height) {
    const cards = [];
    const total = width * height / 2;
    for (let i = 0; i < total; i++) {
        const id = Math.floor((Math.random() * symbols.length));
        cards.push(symbols[id], symbols[id]);
    }
    cards.sort((a, b) => (Math.random() - 0.5));
    return cards;
}

class Game extends React.Component {
    
    constructor(props) {
        super(props);
        this.cards = generateCards(4, 2);
        this.state = {
            score: 0,
            prevCard: null
        };

        this.showCard = this.showCard.bind(this);
    }

    showCard() {
        
    }

    render() {
        const cards = this.cards.map((data, index) => {
            return (
                <div key={index} 
                     className="card"
                     style={{width: "25%", height:"50%"}}>
                    {data}
                </div>);
        });
        return (
            <div className="board">
                { cards }
            </div>
        );
    }
}

export default Game;