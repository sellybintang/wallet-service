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
// ambil seluruh aktivitas dari user id
router.get("/aktivitasku/:user_id", auth.Verify, ctl.getActivities);
// ambil 5 aktivitas terakhir berdasarkan user id
router.get("/riwayatTerakhir/:user_id", auth.Verify, ctl.getLastActivities);
// ambil seluruh aktivitas yang bertipe 'debit'
router.get("/riwayatMasuk/:user_id", auth.Verify, ctl.getMasuk);
// ambil seluruh aktivitas yang bertipe 'debit' dan status ditolak
router.get("/riwayatKeluar/:user_id", auth.Verify, ctl.getKeluar);
// ambil seluruh aktivitas yang bertipe 'pengajuan', jika ada status di query ambil dari status, jika tidak maka ambil yang statusnya ditolak/diterima
router.get("/daftarPengajuan/", auth.Verify, ctl.getDaftarPengajuan);
// ambil seluruh aktivitas yang bertipe 'pengajuan' status ditolak/diterima dari user id
router.get(
  "/daftarPengajuan/:user_id",
  auth.Verify,
  ctl.getDaftarPengajuanUser
);
// ambil seluruh aktivitas yang bertipe 'pengajuan' status ditolak/diterima dari withdraw_id
router.get("/dataPengajuan/:withdraw_id", auth.Verify, ctl.getDataPengajuan);
// ambil seluruh aktivitas yang bertipe 'pengajuan' status diterima/ditolak
router.get("/riwayatPengajuan", auth.Verify, ctl.getRiwayatPengajuan);
// membuat aktivitas bertipe kredit dengan var { jumlah, keterangan } dari body
router.post("/kredit/:user_id", auth.Verify, ctl.kredit);
// membuat aktivitas bertipe debit dengan var { jumlah, keterangan, name } dari body
router.post("/debit/:user_id", auth.Verify, ctl.debit);
// membuat aktivitas bertipe pengajuan dengan var { nama_agen, nama, bank, no_rekening, jumlah, keterangan } dari body
router.post("/ajukanPenarikan/:user_id", auth.Verify, ctl.ajukanPenarikan);
// mengubah aktivitas dengan var { status, bukti_transfer, updated_by } dari body
router.patch("/ubahPengajuan/:withdraw_id", auth.Verify, ctl.ubahPengajuan);
```
### * Function Wallet
```javascript
router.get("/dompetku/:user_id", auth.Verify, ctl.getWallet);
router.post("/buatDompet", auth.Verify, ctl.createWallet);
router.patch("/updateDompet/:user_id", auth.Verify, ctl.updateWallet);
router.delete("/hapusDompet/:user_id", auth.Verify, ctl.deleteWallet);

```
