import "mocha";
import chai, { expect } from "chai";
import admin from "firebase-admin";
import functionsTest from "firebase-functions-test";
import * as functions from "../../functions/src/index";

const testDoc = "users/foo@bar";
const testDocContents = { foo: "bar" };

const test = functionsTest({
  projectId: process.env.GCLOUD_PROJECT,
});

before(async () => {
  admin.initializeApp();
  const ref = admin.firestore().doc(testDoc);
  await ref.set(testDocContents);
});

describe("Firebase Functions", () => {
  it("gets the email list", async () => {
    const wrapped = test.wrap(functions.getEmailList);
    const result = await wrapped({}, { auth: { uid: "foo" } });

    expect(result).to.have.same.members(["simonpfish@gmail.com"]);
  });

  it("checks that account exists", async () => {
    const wrapped = test.wrap(functions.checkAccountExists);
    const result = await wrapped({ email: "foo@bar" });

    expect(result).to.equal(true);
  });

  it("checks that account does not exist", async () => {
    const wrapped = test.wrap(functions.checkAccountExists);
    const result = await wrapped({ email: "no@no" });

    expect(result).to.equal(false);
  });
});
