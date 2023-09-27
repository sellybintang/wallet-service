const {
  ajukanPenarikan,
  kredit,
  debit,
  dataPengajuan,
  aktivitasku,
  daftarPengajuan,
  daftarPengajuanById,
  ubahPengajuan,
  riwayatTerakhir,
  riwayatMasuk,
  riwayatKeluar,
  riwayatPengajuan,
} = require("../controller/activitiesController");

const {
  auth,
  isUser,
  isAgen,
  isUser_Agen,
  isAdmin,
} = require("../middleware/Authorization");
const { walletUser } = require("../middleware/isWallet");
const upload = require("../middleware/uploader");

const router = require("express").Router();

// membuat aktivitas bertipe pengajuan dengan var { nama_agen, nama, bank, no_rekening, jumlah, keterangan } dari body
router.post(
  "/ajukanPenarikan/:user_id",
  upload.single("bukti_transfer"),
  auth,
  isUser_Agen,
  walletUser,
  ajukanPenarikan
);

// membuat aktivitas bertipe kredit dengan var { jumlah, keterangan } dari body
router.post("/kredit/:user_id", auth, isUser_Agen, walletUser, kredit);

router.post(
  "/debit/:user_id",
  auth,
  upload.single("bukti_transfer"),
  isUser_Agen,
  walletUser,
  debit
);

router.patch(
  "/ubahPengajuan/:withdraw_id",
  upload.single("bukti_transfer"),
  auth,
  isAdmin,
  ubahPengajuan
);

router.get("/dataPengajuan/:withdraw_id", auth, isAdmin, dataPengajuan);

router.get("/daftarPengajuan/", auth, isAdmin, daftarPengajuan);

router.get("/daftarPengajuan/:user_id", auth, daftarPengajuanById);
// ambil seluruh aktivitas dari user id
router.get("/aktivitasku/:user_id", auth, aktivitasku);

router.get("/riwayatTerakhir/:user_id", auth, isUser_Agen, riwayatTerakhir);

router.get("/riwayatMasuk/:user_id", auth, isUser_Agen, riwayatMasuk);

router.get("/riwayatKeluar/:user_id", auth, isUser_Agen, riwayatKeluar);

router.get("/riwayatPengajuan", auth, isAdmin, riwayatPengajuan);
module.exports = router;
