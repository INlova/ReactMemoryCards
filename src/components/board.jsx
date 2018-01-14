import React from "react";
import { Card } from "./card";

const tickDuration = 100;
const visibilityDuration = 1000;
const symbols = ["❄", "❅", "❆", "❉", "✴", "✼", "❃"];

function generateCards(size) {
    const cards = [];
    const total = size.width * size.height / 2;
    for (let i = 0; i < total; i++) {
        const id = Math.floor((Math.random() * symbols.length));
        cards.push(symbols[id], symbols[id]);
    }
    cards.sort((a, b) => (Math.random() - 0.5));
    return cards;
}

class Board extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.cards = generateCards(props.size);
        this.timer = null;
        this.state = {
            visibleCards: {},
            foundCards: {},
            prevCard: null,
            showAll: false
        };
        
        this.showCard = this.showCard.bind(this);
        this.handleTick = this.handleTick.bind(this);
    }

    showCard(idx) {
        const visibleCards = Object.assign({}, this.state.visibleCards);
        visibleCards[idx] = visibilityDuration;
        this.setState({ visibleCards: visibleCards });
    }

    componentDidMount() {
        this.timer = setInterval(
            this.handleTick,
            tickDuration);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    handleTick() {
        const cards = Object.assign({}, this.state.visibleCards);
        for (let key in cards) {
            cards[key] -= tickDuration;
            if (cards[key] < 0) {
                delete cards[key];
            }
        }
        this.setState({ visibleCards: cards });
        this.props.onTick(tickDuration);
    }

    render() {
        const cards = this.cards
            .map((data, idx) => {
                const isVisible = !!this.state.visibleCards[idx];
                const isFound = !!this.state.foundCards[idx];
                return <Card 
                    symbol={data} 
                    key={idx} 
                    isVisible = {isVisible}
                    isFound = {isFound}
                    onClick={() => this.showCard(idx)}
                    />;
                });
       return (
           <div className="board">
                { cards }
           </div>);
    }
}

export default Board;