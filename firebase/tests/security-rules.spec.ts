import "mocha";
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";
import chai from "chai";
import firebase from "firebase/compat";

let testEnv: RulesTestEnvironment;
let unauthed: firebase.firestore.Firestore;
let authed: firebase.firestore.Firestore;

chai.should();

before(async () => {
  testEnv = await initializeTestEnvironment({
    firestore: {
      host: "localhost",
      port: 8080,
    },
    projectId: "on-the-loose",
  });

  unauthed = testEnv.unauthenticatedContext().firestore();
  authed = testEnv.authenticatedContext("test-user").firestore();
});

after(async () => {
  await testEnv.cleanup();
});

describe("Data Access", () => {
  const testDoc = "users/foobar";
  const testDocContents = { foo: "bar" };

  it("should create docs", async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await assertSucceeds(
        setDoc(doc(context.firestore(), testDoc), testDocContents)
      );
    });
  });

  it("should not let unauthenticated users access data", async () => {
    await assertFails(getDoc(doc(unauthed, testDoc)));
  });

  it("should let authenticated users access data", async () => {
    await assertSucceeds(setDoc(doc(authed, testDoc), testDocContents));
    await assertSucceeds(getDoc(doc(authed, testDoc)));
  });

  it("should let admins access the mail collection", async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await assertSucceeds(getDocs(collection(context.firestore(), "mail")));
    });
  });

  it("should not let anyone else access the mail collection", async () => {
    await assertFails(getDocs(collection(unauthed, "mail")));
    await assertFails(getDocs(collection(authed, "mail")));
  });
});
