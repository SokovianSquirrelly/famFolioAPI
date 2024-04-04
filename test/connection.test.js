import * as chai from "chai";
const { expect } = chai;
import sinon from "sinon";
import mongoose from "mongoose";
import connectDatabase from "../database/connection.js";

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
});
