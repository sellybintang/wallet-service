const { register, login, listUsers } = require("../controller/authController");

const router = require("express").Router();

router.post("/register", register);

router.post("/login", login);

router.get("/listUser", listUsers);

module.exports = router;
