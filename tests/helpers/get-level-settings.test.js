import {describe, it, before, after} from "mocha";
import {expect} from "chai";

import { getLevelSettings, levelSettings } from "../../src/helpers/level-settings"

function mockDocument(width = 1024, height = 768) {
    
    const document = global.document;
    global.document = {
        documentElement: {
            clientWidth: width,
            clientHeight: height
        }
    };

    const reset = () => { global.document = document };
    return { reset: reset }
}

describe("Get level settings function", function() {

    it("should return correct settings for easy level", function() {
        const mock = mockDocument();
        expect(getLevelSettings("easy"))
            .to.deep.equal(levelSettings.easy);
        mock.reset();
    });

    it("should return correct settings for normal level", function() {
        const mock = mockDocument();
        expect(getLevelSettings("normal"))
            .to.deep.equal(levelSettings.normal);
        mock.reset();
    });

    it("should return correct settings for hard level", function() {
        const mock = mockDocument();
        expect(getLevelSettings("hard"))
            .to.deep.equal(levelSettings.hard);
        mock.reset();
    });
        
    it("should return normal level by default", function() {
        const mock = mockDocument();
        expect(getLevelSettings())
            .to.deep.equal(levelSettings.normal);
        mock.reset();
    });

    it("should swap boardSize if a browser in landscape mode", function() {
        const mock = mockDocument(1000, 1021);
        const originSize = levelSettings.hard.boardSize;
        expect(getLevelSettings("hard").boardSize)
            .to.deep.equal({
                width: originSize.height,
                height: originSize.width
            });
        mock.reset();
    });

    it("should swap boardSize if tablet/smartphone is used", function() {
        const mock = mockDocument(400,200);
        const originSize = levelSettings.hard.boardSize;
        expect(getLevelSettings("hard").boardSize)
            .to.deep.equal({
                width: originSize.height,
                height: originSize.width
            });
        mock.reset();
    });

});