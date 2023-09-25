const {
  buatDompet,
  dompetku,
  semuaDompet,
  updateDompet,
  hapusDompet,
} = require("../controller/walletController");
const {
  auth,
  isAdmin,
  isUser,
  isAgen,
  isUser_Agen,
} = require("../middleware/Authorization");

const router = require("express").Router();

// router.post("/buatDompet", auth, isUser, isAgen, buatDompet);
router.post("/buatDompet", auth, isUser_Agen, buatDompet);
router.get("/semuadompet", auth, isAdmin, semuaDompet);
router.get("/dompetku/:user_id", auth, isUser_Agen, dompetku);

// harus pemilik yang bisa update
router.patch(
  "/updateDompet/:user_id",
  auth,
  isUser_Agen,
  isUser_Agen,
  updateDompet
);
router.delete("/hapusDompet/:user_id", isUser_Agen, hapusDompet);

module.exports = router;
