import "jsdom-global/register"
import React from "react";

import { describe, it, before, after } from "mocha";
import { expect } from "chai";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Game from "../../src/components/game"
import LevelSelection from "../../src/components/level-selection"
import Result from "../../src/components/result"
import InfoPanel from "../../src/components/info-panel"
import Board from "../../src/components/board"
import Footer from "../../src/components/footer-panel"

import { levelSettings } from "../../src/helpers/level-settings"

configure({ adapter: new Adapter() });

describe("<Game /> Component", function() {
    
    it("should ask user to choose the level at the beginning", () => {
        const game = mount(<Game />);

        const levelSelection = game.find(LevelSelection);
        game.unmount();
        
        expect(levelSelection).to.have.length(1);
    });
    
    it("should render a game board when level is chosen", () => {
        const game = mount(<Game />);
        game.instance().selectLevel("easy");
        game.update();

        const board = game.find(Board);
        game.unmount();
        
        expect(board).to.have.length(1);
    });

    it("should render info panel and footer when the game is running", () => {
        const game = mount(<Game />);
        game.instance().selectLevel("normal");
        game.update();

        const infoPanel = game.find(InfoPanel);
        const footer = game.find(Footer);
        game.unmount();
        
        expect(infoPanel).to.have.length(1);
        expect(footer).to.have.length(1);
    });
    
    it("should show result popup at the end", () => {
        const game = mount(<Game />);
        const total = levelSettings.easy.maxScore;

        game.instance().selectLevel("easy");
        game.setState({ "score": total });

        expect(game.find(Result)).to.have.length(1);
    });
    
});
