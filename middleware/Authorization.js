const jwt = require("jsonwebtoken");
const firebase_admin = require("../db/firebase_admin");
const { getAuth } = require("../db/firebase_admin");
const auth = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;

    if (!bearer) {
      res.status(401).json({
        status: "401",
        message: "Invalid bearer token",
      });
    }

    const token = await bearer.split("Bearer ")[1];

    const tokenPayload = jwt.verify(token, "secret");

    if (tokenPayload.exp && tokenPayload.exp < Math.floor(Date.now() / 1000)) {
      return res.status(402).json({
        status: "403",
        message: "your token have expired. Please try again",
      });
    }

    const user = await getAuth.getUser(tokenPayload.uid);

    const userCredential = await firebase_admin.db
      .collection("Users")
      .doc(tokenPayload.uid)
      .get();

    const newData = {
      uid: user.uid,
      email: user.email,
      role: userCredential.data().role,
      nama: userCredential.data().nama,
      address: userCredential.data().address,
      no_telp: userCredential.data().no_telp,
    };

    req.user = newData;

    next();
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

const isUser_Agen = (req, res, next) => {
  try {
    if (req.user.role === "1" || req.user.role === "2") {
      next();
    } else {
      return res.status(401).json({
        status: "401",
        message: "only be accessed by user and agen",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};
const isUser = (req, res, next) => {
  try {
    if (req.user.role === "1") {
      next();
    } else {
      return res.status(401).json({
        status: "401",
        message: "is not authorized",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

const isAgen = (req, res, next) => {
  try {
    if (req.user.role === "2") {
      next();
    } else {
      return res.status(401).json({
        status: "401",
        message: "is not authorized",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role === "3") {
      next();
    } else {
      return res.status(401).json({
        status: "401",
        message: "only be accessed by admin ",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

module.exports = { auth, isUser, isAgen, isUser_Agen, isAdmin };
