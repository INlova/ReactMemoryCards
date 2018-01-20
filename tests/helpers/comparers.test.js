import {describe, it, before, after} from "mocha";
import {expect} from "chai";

import { equalKeys } from "../../src/helpers/comparers"

describe("EqualKeys function", function() {

    it("should return true when an object compared with itself", function() {
        const obj = { test: "me" };
        expect(equalKeys(obj, obj)).to.be.true;
    });

    it("should return true when compared objects have same keys", function() {
        const first = { test: 2, me: "me" };
        const second = { test: 3, me: [1, 2, 3] };
        expect(equalKeys(first, second)).to.be.true;
    });

    it("should return true when second object doesn't have some keys", function() {
        const first = { test: 2, me: "me", please: [1, 2] };
        const second = { test: 3, me: [1, 2, 3] };
        expect(equalKeys(first, second)).to.be.false;
    });

    it("should return true when first object doesn't have some keys", function() {
        const first = { test: 2, me: "me" };
        const second = { test: 3, me: [1, 2, 3], please: [1, 2] };
        expect(equalKeys(first, second)).to.be.false;
    });

});