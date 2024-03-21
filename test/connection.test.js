const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const mongoose = require("mongoose");
const connectDatabase = require("./connection"); // Assuming the connection file is located at './connection.js'

describe("connectDatabase", () => {
  let connectStub;

  beforeEach(() => {
    connectStub = sinon.stub(mongoose, "connect");
  });

  afterEach(() => {
    connectStub.restore();
  });

  it("should connect to the database successfully", async () => {
    connectStub.resolves(); // Simulate a successful connection

    await connectDatabase();

    expect(connectStub.calledOnce).to.be.true;
  });

  it("should fail to connect to the database", async () => {
    connectStub.rejects(); // Simulate a failed connection

    try {
      await connectDatabase();
    } catch (error) {
      expect(connectStub.calledOnce).to.be.true;
    }
  });
});
