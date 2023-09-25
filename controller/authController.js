const { signInWithEmailAndPassword } = require("firebase/auth");
const firebaseAdmin = require("../db/firebase_admin");
const { auth } = require("../db/firebase_client");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password, nama, address, no_telp, role } = req.body;
    const credential = await firebaseAdmin.getAuth.createUser({
      email,
      password,
    });

    const user = credential.uid;
    const userCollection = firebaseAdmin.db.collection("Users").doc(user);

    await userCollection.set({
      nama,
      role,
      address,
      no_telp,
    });

    res.status(200).json({
      status: "200",
      message: "Successfully created a new user",
      data: {
        email,
        password,
        nama,
        address,
        no_telp,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const tokenPayload = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    };
    console.log(userCredential.user.uid);
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

    res.status(200).json({
      status: "200",
      message: "Successfully signed the token",
      data: { uid: userCredential.uid, email, token },
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

const listUsers = async (req, res) => {
  try {
    const listUser = await firebaseAdmin.getAuth.listUsers();
    res.status(200).json({
      status: "200",
      message: "Successfully getting list of users",
      listUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  listUsers,
};
