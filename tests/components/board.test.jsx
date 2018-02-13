import "jsdom-global/register"
import React from "react";

import { describe, it, before, after } from "mocha";
import { expect } from "chai";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Board from "../../src/components/board"
import Card from "../../src/components/card"

import { levelSettings } from "../../src/helpers/level-settings"

configure({ adapter: new Adapter() });

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

describe("<Board /> Component", function() {
    
    it("should render correct amount of cards", () => {
        const props = { size: { width: 4, height: 6 }, level: 1, onCardsMatched: null }
        const board = mount(<Board {...props}/>);
        const cards = board.find(Card);
        const total = props.size.width * props.size.height;
        board.unmount();
        expect(cards).to.have.length(total);
    });

    it("should render all cards with cover on top", () => {
        const props = { size: { width: 4, height: 6 }, level: 1, onCardsMatched: null }
        const board = mount(<Board {...props}/>);
        const cards = board.find("[isVisible=true]");
        board.unmount();
        expect(cards).to.have.length(0);
    });
   
    it("should flip selected card", () => {
        const props = { size: { width: 4, height: 2 }, level: 1, onCardsMatched: null };
        const totalCards = props.size.width * props.size.height;
        const cardId = getRandom(totalCards);

        const board = mount(<Board {...props}/>);
        board.instance().showCard(cardId);
        board.update();
        const visibleCards = board.find("[isVisible=true]");
        const visibleCardIdx = +visibleCards.get(0).key;
        board.unmount();

        expect(visibleCards).to.have.length(1);
        expect(visibleCardIdx).to.equal(cardId);
    });
    
});
