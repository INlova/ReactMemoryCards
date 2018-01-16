import React from "react";
import { Card } from "./card";
import { generateCards } from "../helpers/boardGenerator";

const tickDuration = 100;
const visibilityDuration = 1000;

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
        const newState = {
            visibleCards: visibleCards,
            prevCard: null
        };
        const prevCard = this.state.prevCard;
        if (prevCard !== null && prevCard !== idx && 
            this.state.visibleCards[prevCard] &&
            this.cards[prevCard] === this.cards[idx]) 
        {
            const foundCards = Object.assign({}, this.state.foundCards);
            foundCards[prevCard] = true;
            foundCards[idx] = true;
            newState["foundCards"] = foundCards;
            this.props.onCardsMatched(this.cards[idx]);
        } else {
            newState.prevCard = idx;
        }
        this.setState(newState);
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
                    key={idx} 
                    symbol={data} 
                    onClick={() => this.showCard(idx)}
                    isVisible = {isVisible}
                    isFound = {isFound}
                    />;
                });
       return (
           <div className="board">
                { cards }
           </div>);
    }
}

export default Board;