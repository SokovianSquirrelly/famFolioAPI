// import { expect } from 'chai';
// import sinon from 'sinon';
// import mongoose from 'mongoose';
// import Media from '../models/mediaModel.js';
// import mediaController from '../controllers/mediaController.js';

// describe('Media Controller', () => {
//   let sandbox;

//   before(async () => {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//     });
//   });

//   after(async () => {
//     await mongoose.connection.close();
//   });

//   beforeEach(() => {
//     sandbox = sinon.createSandbox();
//   });

//   afterEach(() => {
//     sandbox.restore();
//   });

//   describe('getMyMediaByUserId', () => {
//     it('should return media for a specific user', async () => {
//       // Setup: Insert a sample media for testing
//       const sampleMedia = new Media({
//         user_id: 'sample_user_id',
//         // Add other required fields according to your schema
//       });
//       await sampleMedia.save();

//       // Exercise: Call the controller method
//       const req = { params: { userId: 'sample_user_id' } };
//       const res = {
//         json: sandbox.spy(),
//         status: sandbox.stub().returnsThis(),
//       };
//       await mediaController.getMyMediaByUserId(req, res);

//       // Verify: Check if the controller returned the expected response
//       expect(res.status.calledWith(200)).to.be.true;
//       expect(res.json.calledOnce).to.be.true;
//       expect(res.json.firstCall.args[0]).to.be.an('array');
//       expect(res.json.firstCall.args[0].length).to.be.greaterThan(0);
//     });
//   });

//   // Add more test cases for other controller methods as needed

//   // Example test for another method
//   describe('addMedia', () => {
//     it('should add new media', async () => {
//       // Setup: Define sample request and response objects
//       const req = {
//         body: {
//           // Define sample media data here
//         },
//         user: {
//           userId: 'sample_user_id',
//         },
//       };
//       const res = {
//         json: sandbox.spy(),
//         status: sandbox.stub().returnsThis(),
//       };

//       // Exercise: Call the controller method
//       await mediaController.addMedia(req, res);

//       // Verify: Check if the controller returned the expected response
//       expect(res.status.calledWith(201)).to.be.true;
//       expect(res.json.calledOnce).to.be.true;
//       // Add more assertions if needed
//     });
//   });

//   // Add more test cases for other controller methods as needed
// });
