const admin = require("firebase-admin");

const firebaseConfig = require("./firebaseConfigAdmin.json");
const dotenv = require("dotenv");
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  storageBucket: "gs://causal-calculus-371108.appspot.com",
});

const getAuth = admin.auth();
const db = admin.firestore();

module.exports = {
  getAuth,
  db,
};
