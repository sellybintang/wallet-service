const mongoose = require("mongoose");

const activitiesSchema = mongoose.Schema({
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

module.exports = mongoose.model("Activities", activitiesSchema);
