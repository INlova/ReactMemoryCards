import React from "react";

import { describe, it, before, after } from "mocha";
import { expect } from "chai";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import LevelSelection from "../../src/components/level-selection"

configure({ adapter: new Adapter() });


describe("<LevelSelection /> Component", function() {

    it("should contain 3 buttons to continue the game", () => {
        const props = { "onLevelSelected" : () => {} };
        const result = shallow(<LevelSelection {...props} />);
        const playBtns = result.find(".play");
        expect(playBtns.length).to.equal(3);
    });

    it("should handle 'Easy' button click", () => {
        let chosenLevel = null;
        const props = { "onLevelSelected" : (lvl) => { chosenLevel = lvl; } };
        const result = shallow(<LevelSelection {...props} />);
        const easyBtn = result.find(".easy");
        expect(easyBtn.text()).to.contains( "Easy" );
        easyBtn.simulate("click");
        expect(chosenLevel).to.equal("easy");
    });

    it("should handle 'Normal' button click", () => {
        let chosenLevel = null;
        const props = { "onLevelSelected" : (lvl) => { chosenLevel = lvl; } };
        const result = shallow(<LevelSelection {...props} />);
        const easyBtn = result.find(".normal");
        expect(easyBtn.text()).to.contains( "Normal" );
        easyBtn.simulate("click");
        expect(chosenLevel).to.equal("normal");
    });

    it("should handle 'Hard' button click", () => {
        let chosenLevel = null;
        const props = { "onLevelSelected" : (lvl) => { chosenLevel = lvl; } };
        const result = shallow(<LevelSelection {...props} />);
        const easyBtn = result.find(".hard");
        expect(easyBtn.text()).to.contains( "Hard" );
        easyBtn.simulate("click");
        expect(chosenLevel).to.equal("hard");
    });

});
