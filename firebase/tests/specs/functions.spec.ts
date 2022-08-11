import "mocha";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import admin from "firebase-admin";
import functionsTest from "firebase-functions-test";
import * as functions from "../../functions/src/index";

const testDoc = "users/foo@bar";
const testDocContents = { foo: "bar" };
chai.use(chaiAsPromised);

const test = functionsTest({
  projectId: process.env.GCLOUD_PROJECT,
});

before(async () => {
  admin.initializeApp();
  const ref = admin.firestore().doc(testDoc);
  await ref.set(testDocContents);
});

describe("Firebase Functions", () => {
  it("should get the email list", async () => {
    const wrapped = test.wrap(functions.getEmailList);
    const result = await wrapped({}, { auth: { uid: "foo" } });

    expect(result).to.have.same.members(["simonpfish@gmail.com"]);
  });

  it("should fail to get the email list without auth", async () => {
    const wrapped = test.wrap(functions.getEmailList);
    return expect(wrapped({})).to.be.rejectedWith("Not authorized");
  });

  it("should check that account exists", async () => {
    const wrapped = test.wrap(functions.checkAccountExists);
    const result = await wrapped({ email: "foo@bar" });

    expect(result).to.equal(true);
  });

  it("should check that account does not exist", async () => {
    const wrapped = test.wrap(functions.checkAccountExists);
    const result = await wrapped({ email: "no@no" });

    expect(result).to.equal(false);
  });

  it("should send trip creation email", async () => {
    const wrapped = test.wrap(functions.onTripCreation);

    // Make a fake document snapshot to pass to the function
    const trip = test.firestore.makeDocumentSnapshot(
      {
        title: "TEST TRIP",
        leader: { name: "TEST" },
      },
      "/trips/TEST_TRIP_ID"
    );

    const result = await wrapped(trip);
    expect(result.statusCode).to.equal(202);
  });
});
