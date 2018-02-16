import React from "react";
import PropTypes from "prop-types";

import Card from "./card";
import { generateCards } from "../helpers/board-generator";
import { equalKeys } from "../helpers/comparers";
import { boardTickDuration as tickDuration, cardVisibilityDuration }  from "../helpers/timer-settings";

class Board extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.timer = null;


        this.state = {
            visibleCards: {},
            foundCards: {},
            prevCard: null
        };

        this.cards = generateCards(props.size);
        this.updateCardSize(props.size);

        this.showCard = this.showCard.bind(this);
        this.handleTick = this.handleTick.bind(this);
    }

    updateCardSize(boardSize) {
        this.cardSize = {
            width: `${Math.floor(100 / boardSize.width)}%`,
            height: `${Math.floor(100 / boardSize.height)}%`
        };
    }

    showCard(idx) {
        const visibleCards = Object.assign({}, this.state.visibleCards);
        visibleCards[idx] = cardVisibilityDuration;
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

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.level !== this.props.level) {
            return true;
        }
        if (!equalKeys(nextState.visibleCards, this.state.visibleCards)) {
            return true;
        }
        if (!equalKeys(nextState.foundCards, this.state.foundCards)) {
            return true;
        }
        return false;
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
    }

    componentWillReceiveProps(nextProps) {
        this.reset(nextProps.level);
        this.updateCardSize(nextProps.size);
    }

    reset(newLevel) {
        if (newLevel !== this.props.level) {
            this.cards = generateCards(this.props.size);
            this.setState({
                visibleCards: {},
                foundCards: {},
                prevCard: null
            });
        }
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
                    style={{width: this.cardSize.width , height: this.cardSize.height }}
                    />;
                });
       return (
           <div className="board">
                    { cards }
           </div>);
    }
};

Board.propTypes = {
    size: PropTypes.object.isRequired,
    level: PropTypes.number.isRequired,
    onCardsMatched: PropTypes.func.isRequired
};

export default Board;