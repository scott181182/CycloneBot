import index = require("../src/index");

import "mocha";
import * as chai from "chai";

const expect = chai.expect;

describe("index", () => {
  it("should exist", () => {
    expect(index).to.not.be.undefined;
  });
});
