import React from "react";

import { describe, it, before, after } from "mocha";
import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
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

    it("should be clickable when cover is on top", () => {
        let clickCounter = 0;
        const clickSpy = () => { console.log("CLICK CARD!!!"); clickCounter++; }
        const props = { "isVisible" : true, "onClick": clickSpy };
        const cardComponent = shallow(<Card {...props}/>);
        cardComponent.find(".card").simulate("click");
        expect(clickCounter).to.equal(1);
    });

    it("should not be clickable when card is found", () => {
        let clickCounter = 0;
        const clickSpy = () => { console.log("CLICK CARD!!!"); clickCounter++; }
        const props = { "isFound" : true, "onClick": clickSpy };
        const cardComponent = shallow(<Card {...props}/>);
        cardComponent.find(".card").simulate("click");
        expect(clickCounter).to.equal(0);
    });

    it("should be clickable when card is already flipped", () => {
            let clickCounter = 0;
            const clickSpy = () => { console.log("CLICK CARD!!!"); clickCounter++; }
            const props = { "isVisible" : true, "onClick": clickSpy };
            const cardComponent = shallow(<Card {...props}/>);
            cardComponent.find(".card").simulate("click");
            expect(clickCounter).to.equal(1);
    });

});