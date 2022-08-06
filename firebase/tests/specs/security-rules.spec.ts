import "mocha";
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
  getDocs,
  collection,
  setLogLevel,
} from "firebase/firestore";
import firebaseConfig from "../../firebase.json";
import firebase from "firebase/compat";

let testEnv: RulesTestEnvironment;
let unauthed: firebase.firestore.Firestore;
let authed: firebase.firestore.Firestore;

before(async () => {
  setLogLevel("error");

  testEnv = await initializeTestEnvironment({
    firestore: {
      host: "localhost",
      port: firebaseConfig.emulators.firestore.port,
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

  it("should not let unauthenticated users access data", async () => {
    await assertFails(getDoc(doc(unauthed, testDoc)));
  });

  it("should let authenticated users access data", async () => {
    await assertSucceeds(setDoc(doc(authed, testDoc), testDocContents));
    await assertSucceeds(getDoc(doc(authed, testDoc)));
  });

  it("should not let anyone access the mail collection", async () => {
    await assertFails(getDocs(collection(unauthed, "mail")));
    await assertFails(getDocs(collection(authed, "mail")));
    await assertFails(setDoc(doc(unauthed, "mail", "foo"), { foo: "bar" }));
    await assertFails(setDoc(doc(authed, "mail", "foo"), { foo: "bar" }));
  });
});
