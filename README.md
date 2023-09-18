# Service Wallet Intern

## - `Models`
### * Model Activities
```javascript
Schema({
  user_id: {
    type: String,
    required: true,
  },
  tipe: {
    type: String,
    enum: ["kredit", "debit", "pengajuan"],
    required: true,
  },
  nama_agen: {
    type: String,
  },
  nama: {
    type: String,
  },
  bank: {
    type: String,
  },
  no_rekening: {
    type: String,
  },
  jumlah: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "pending",
      "ajukan_proses",
      "proses",
      "ajukan_lunas",
      "lunas",
      "ditolak",
    ],
    default: "pending",
  },
  keterangan: {
    type: String,
  },
  bukti_transfer: {
    type: String,
  },
  created_at: {
    type: Number,
    required: true,
  },
  updated_at: {
    type: Number,
  },
  updated_by: {
    type: Array,
  },
});
```
### * Model Wallet
```javascript
Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Number,
    default: Date.now(),
  },
  updated_at: {
    type: Number,
    default: Date.now(),
  },
});
```

## - `Functions`
### * Function Activities
```javascript
router.get("/aktivitasku/:user_id", auth.Verify, ctl.getActivities);
router.get("/riwayatTerakhir/:user_id", auth.Verify, ctl.getLastActivities);
router.get("/riwayatMasuk/:user_id", auth.Verify, ctl.getMasuk);
router.get("/riwayatKeluar/:user_id", auth.Verify, ctl.getKeluar);
router.get("/daftarPengajuan/", auth.Verify, ctl.getDaftarPengajuan);
router.get(
  "/daftarPengajuan/:user_id",
  auth.Verify,
  ctl.getDaftarPengajuanUser
);
router.get("/dataPengajuan/:withdraw_id", auth.Verify, ctl.getDataPengajuan);
router.get("/riwayatPengajuan", auth.Verify, ctl.getRiwayatPengajuan);
router.get("/cetakSuratPerintah/:withdraw_id", ctl.cetakSuratPerintah);
router.post("/kredit/:user_id", auth.Verify, ctl.kredit);
router.post("/debit/:user_id", auth.Verify, ctl.debit);
router.post("/ajukanPenarikan/:user_id", auth.Verify, ctl.ajukanPenarikan);
router.patch("/ubahPengajuan/:withdraw_id", auth.Verify, ctl.ubahPengajuan);
```
### * Function Wallet
```javascript
router.get("/dompetku/:user_id", auth.Verify, ctl.getWallet);
router.post("/buatDompet", auth.Verify, ctl.createWallet);
router.patch("/updateDompet/:user_id", auth.Verify, ctl.updateWallet);
router.delete("/hapusDompet/:user_id", auth.Verify, ctl.deleteWallet);

```
