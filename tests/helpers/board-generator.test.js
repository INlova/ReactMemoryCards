import {describe, it, before, after} from "mocha";
import {expect} from "chai";

import { generateCards } from "../../src/helpers/board-generator"

describe("Cards genetating function", function() {

    it("should returns array of cards based on board size", function() {
        const width = Math.floor(Math.random() * 20) + 1;
        const height = (Math.floor(Math.random() * 20) + 1) * 2;
        const boardSize = width * height;
        expect(generateCards({ width: width, height: height }))
            .to.be.an('array')
            .that.has.lengthOf(boardSize);
    });

    it("should return cards in pairs", function() {
        const size = { width: 4, height: 5 }
        const groupedCards = {};
        generateCards(size)
            .forEach((card) => {
                groupedCards[card] = (groupedCards[card] || 0) + 1;
            });
        for (let cardType in groupedCards) {
            expect(groupedCards[cardType] % 2).to.equal(0);
        }
    });

});