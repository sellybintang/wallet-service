const router = require("express").Router();
const activitiesRoutes = require("./activitiesRoutes");
const walletRoutes = require("./walletRoutes");
const authRoutes = require("./authRoutes");

router.use("/", activitiesRoutes);
router.use("/", walletRoutes);
router.use("/", authRoutes);

module.exports = router;
