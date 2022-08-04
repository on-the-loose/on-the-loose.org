import "mocha";
import { readFileSync } from "fs";
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  setLogLevel,
} from "firebase/firestore";
import assert from "assert";
import chai from "chai";

let testEnv: RulesTestEnvironment;
chai.should();

// before(async () => {
//   // Silence expected rules rejections from Firestore SDK. Unexpected rejections
//   // will still bubble up and will be thrown as an error (failing the tests).
//   setLogLevel("error");

//   testEnv = await initializeTestEnvironment({
//     firestore: { rules: readFileSync("firestore.rules", "utf8") },
//   });
// });

// after(async () => {
//   // Delete all the FirebaseApp instances created during testing.
//   // Note: this does not affect or clear any data.
//   await testEnv.cleanup();
// });

// beforeEach(async () => {
//   await testEnv.clearFirestore();
// });

describe("Test test test", () => {
  const variable = true;
  it("should FAIL", async function () {
    variable.should.equal(false);
  });

  it("should SUCCEED", async function () {
    variable.should.equal(true);
  });
});
