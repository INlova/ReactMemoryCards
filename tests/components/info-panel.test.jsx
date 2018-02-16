import React from "react";

import { describe, it, before, after } from "mocha";
import { expect } from "chai";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import InfoPanel from "../../src/components/info-panel"

configure({ adapter: new Adapter() });


describe("<InfoPanel /> Component", function() {

    it("should display current score", () => {
        const props = { "score": 101, "duration": 590000 };
        const infoPanel = shallow(<InfoPanel />);
        infoPanel.setProps(props);
        const scoreBlock = infoPanel.find(".score");
        expect(scoreBlock.length).to.equal(1);
        expect(scoreBlock.text()).to.contains( props.score );
    });

    it("should display current time", () => {
        const infoPanel = shallow(<InfoPanel />);
        infoPanel.setProps({ "score": 101, "duration": 59000 });
        const timeBlock = infoPanel.find(".time");
        expect(timeBlock.length).to.equal(1);
        expect(timeBlock.text()).to.contains( "59" );
    });

    it("should render 'Reset' and 'New Game' buttons", () => {
        const infoPanel = shallow(<InfoPanel />);
        const buttons = infoPanel.find("button");
        expect(buttons.length).to.equal(2);
        expect(buttons.someWhere(b => b.text() === "New game")).to.equal(true);
        expect(buttons.someWhere(b => b.text() === "Reset")).to.equal(true);
    });

});
