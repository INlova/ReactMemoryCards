import React from "react";

import { describe, it, before, after } from "mocha";
import { expect } from "chai";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Card from "../../src/components/card"

configure({ adapter: new Adapter() });


describe("<Card /> Component", function() {

    it("should render found card correctly", () => {
        const props = { "isFound" : true };
        const cardComponent = shallow(<Card {...props}/>);
        expect(cardComponent.find(".found").length).to.equal(1);
    });

    it("should hold found card visible", () => {
        const props = {
            "isFound" : true,
            "symbol" : "*"
        };
        const cardComponent = shallow(<Card {...props}/>);
        expect(cardComponent.find(".cover").length).to.equal(0);
        expect(cardComponent.text()).to.contains(props.symbol);
    });

    it("should render visible card correctly", () => {
        const props = {
            "isVisible" : true,
            "symbol" : "*"
        };
        const cardComponent = shallow(<Card {...props}/>);
        expect(cardComponent.find(".cover").length).to.equal(0);
        expect(cardComponent.text()).to.contains(props.symbol);
    });

    it("should render hidden card correctly", () => {
        const props = {
                "isVisible" : false,
                "symbol" : "*"
        };
        const cardComponent = shallow(<Card {...props}/>);
        expect(cardComponent.find(".cover").length).to.equal(1);
        expect(cardComponent.text()).to.not.contains(props.symbol);
    });

});