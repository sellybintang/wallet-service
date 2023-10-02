const Activities = require("../models/activitiesSchema");
const path = require("path");
const fs = require("fs");
// membuat aktivitas bertipe pengajuan dengan var { nama_agen, nama, bank, no_rekening, jumlah, keterangan } dari body
const ajukanPenarikan = async (req, res) => {
  try {
    const { uid } = req.user;

    console.log(req.file);

    const { name } = req.wallet;
    const user_id = req.params.user_id;
    const { nama_agen, bank, no_rekening, jumlah, keterangan, status } =
      req.body;
    const ajukan = await Activities.create({
      user_id: user_id,
      nama_agen: nama_agen,
      nama: name,
      bank: bank,
      no_rekening: no_rekening,
      jumlah: jumlah,
      keterangan: keterangan,
      bukti_transfer: null,
      status: status,
      tipe: "pengajuan",
      created_at: Date.now(),
      updated_at: Date.now(),
      updated_by: uid,
    });

    if (user_id !== uid) {
      res.status(404).json({
        status: "404",
        message: "user_id is not a valid user",
      });
    }

    res.status(200).json({
      status: "200",
      message: "Berhasil membuat ajukan penarikan",
      ajukan,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// membuat aktivitas bertipe kredit dengan var { jumlah, keterangan} dari body
const kredit = async (req, res) => {
  try {
    const id = req.params.user_id;
    const bukti = req.file;
    const { uid } = req.user;
    const { user_id, balance, updateBalance } = req.wallet;
    const { jumlah, keterangan, nama } = req.body;
    const updateJumlah = balance - jumlah;
    console.log(updateJumlah);

    if (user_id !== uid) {
      res.status(404).json({
        status: "404",
        message: "user_id is not a valid user",
      });
    }

    if (balance < jumlah) {
      res.status(404).json({
        status: "400",
        message: "your wallet havent enough",
      });
    }

    await updateBalance.updateOne({ balance: updateJumlah });

    const kredit = await Activities.create({
      user_id: id,
      jumlah: jumlah,
      keterangan: keterangan,
      nama: nama,
      tipe: "kredit",
      status: "lunas",
      bukti_transfer: bukti,
      created_at: Date.now(),
      updated_by: Date.now(),
    });

    res.status(200).json({
      status: "200",
      message: "Berhasil membuat kredit",
      kredit,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// membuat aktivitas bertipe debit dengan var { jumlah, keterangan, name } dari body

const debit = async (req, res) => {
  try {
    const id = req.params.user_id;
    const { uid } = req.user;
    const bukti = req.file;
    const { user_id, balance, updateBalance } = req.wallet;
    const { jumlah, keterangan, nama } = req.body;
    const updateJumlah = balance + jumlah;
    console.log(updateJumlah);
    if (user_id !== uid) {
      res.status(404).json({
        status: "404",
        message: "user_id is not a valid user",
      });
    }

    await updateBalance.updateOne({ balance: updateJumlah });

    const debit = await Activities.create({
      user_id: id,
      jumlah: jumlah,
      keterangan: keterangan,
      nama: nama,
      tipe: "debit",
      bukti_transfer: bukti,
      status: "lunas",
      created_at: Date.now(),
      updated_by: Date.now(),
    });
    res.status(200).json({
      status: "200",
      message: "Berhasil membuat debit",
      debit,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// ambil seluruh aktivitas dari user id

const aktivitasku = async (req, res) => {
  try {
    const id = req.params.user_id;

    const { uid } = req.user;
    if (id !== uid) {
      res.status(404).json({
        status: "404",
        message: "user_id is not a valid user",
      });
    }
    const aktivitasku = await Activities.find({ user_id: id });
    res.status(200).json({
      status: "200",
      message: "list aktivitas berhasil ditampilkan",
      aktivitasku,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// ambil seluruh aktivitas yang bertipe 'pengajuan' status ditolak/diterima dari withdraw_id
// belom
const dataPengajuan = async (req, res) => {
  try {
    const id = req.params.withdraw_id;

    const dataPengajuan = await Activities.findById(id);

    console.log(dataPengajuan._id);

    if (
      dataPengajuan.status !== "ditolak" &&
      dataPengajuan.status !== "lunas"
    ) {
      return res.status(404).json({
        status: "404",
        message: "data still processing",
      });
    }

    res.status(200).json({
      status: "200",
      message: "Berhasil mengambil data pengajuan",
      dataPengajuan,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// ambil seluruh aktivitas yang bertipe 'pengajuan' status ditolak/diterima dari user id

const daftarPengajuan = async (req, res) => {
  try {
    const tipe = req.query.tipe;
    const status = req.query.status;
    const data = await Activities.find();
    const daftarData = { ...data._doc };

    if (!tipe && !status) {
      daftarData.tipe = "pengajuan";
      daftarData.status = ["ditolak", "lunas"];
    } else if (tipe && status) {
      daftarData.tipe = "pengajuan";
      daftarData.status = status;
    }

    const daftarPengajuan = await Activities.find(daftarData);
    res.status(200).json({
      status: "200",
      message: "Berhasil mengambil data pengajuan",
      daftarPengajuan,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// ambil seluruh aktivitas yang bertipe 'pengajuan' status ditolak/diterima dari user id

const daftarPengajuanById = async (req, res) => {
  try {
    const id = req.params.user_id;

    const { uid } = req.user;
    if (id !== uid) {
      res.status(404).json({
        status: "404",
        message: "user_id is not a valid user",
      });
    }
    const daftarPengajuanById = await Activities.find({
      user_id: id,
      tipe: "pengajuan",
      status: ["lunas", "ditolak"],
    });

    res.status(200).json({
      status: "200",
      message: "Berhasil menampilkan data pengajuan berdasarkan Id",
      daftarPengajuanById,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// mengubah aktivitas dengan var { status, bukti_transfer, updated_by } dari body
// router.patch("/ubahPengajuan/:withdraw_id", auth.Verify, ctl.ubahPengajuan);

const ubahPengajuan = async (req, res) => {
  try {
    const bukti = req.file.originalname;

    const id = req.params.withdraw_id;
    const { uid } = req.user;
    const { status } = req.body;
    let newStatus = status;

    const ubah_pengajuan = await Activities.findByIdAndUpdate(id, {
      status: newStatus,
      bukti_transfer: bukti,
      updated_by: uid,
    });
    if (status === "pending") {
      newStatus = "ajukan_proses";
    } else if (status === "ajukan lunas") {
      $or: [{ newStatus: "lunas" }, { newStatus: "ditolak" }];
    }

    res.status(200).json({
      status: "200",
      message: "Berhasil merubah data pengajuan berdasarkan Id",
      ubah_pengajuan,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// ambil 5 aktivitas terakhir berdasarkan user id
// router.get("/riwayatTerakhir/:user_id", auth.Verify, ctl.getLastActivities);

const riwayatTerakhir = async (req, res) => {
  try {
    const id = req.params.user_id;

    const { uid } = req.user;
    if (id !== uid) {
      res.status(404).json({
        status: "404",
        message: "user_id is not a valid user",
      });
    }
    const riwayat = await Activities.find({ user_id: id })
      .sort({ created_at: -1 })
      .limit(5);

    res.status(200).json({
      status: "200",
      message: "Berhasil merubah data pengajuan berdasarkan Id",
      riwayat,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// ambil seluruh aktivitas yang bertipe 'debit'
// router.get("/riwayatMasuk/:user_id", auth.Verify, ctl.getMasuk);
const riwayatMasuk = async (req, res) => {
  try {
    const id = req.params.user_id;

    const { uid } = req.user;
    if (id !== uid) {
      res.status(404).json({
        status: "404",
        message: "user_id is not a valid user",
      });
    }
    const riwayatMasuk = await Activities.find({
      user_id: id,
      tipe: "debit",
    });

    res.status(200).json({
      status: "200",
      message: "Berhasil menampilkan data riwayat masuk debit",
      riwayatMasuk,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// ambil seluruh aktivitas yang bertipe 'debit' dan status ditolak
// router.get("/riwayatKeluar/:user_id", auth.Verify, ctl.getKeluar);

const riwayatKeluar = async (req, res) => {
  try {
    const id = req.params.user_id;
    const { uid } = req.user;
    if (id !== uid) {
      res.status(404).json({
        status: "404",
        message: "user_id is not a valid user",
      });
    }
    const riwayatKeluar = await Activities.find({
      user_id: id,
      tipe: "debit",
      status: "ditolak",
    });
    res.status(200).json({
      status: "200",
      message: "Berhasil menampilkan data riwayat keluar debit yang ditolak",
      riwayatKeluar,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// ambil seluruh aktivitas yang bertipe 'pengajuan' status diterima/ditolak
// router.get("/riwayatPengajuan", auth.Verify, ctl.getRiwayatPengajuan);

const riwayatPengajuan = async (req, res) => {
  try {
    const riwayatPengajuan = await Activities.find({
      tipe: "pengajuan",
      status: ["lunas", "ditolak"],
    });

    res.status(200).json({
      status: "200",
      message:
        "Berhasil menampilkan data riwayat pengajuan yang diterima dan ditolak",
      riwayatPengajuan,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// const ubahKredit = async(req, res)=>{
//   try{

//   }catch(error){
//     res.status(500).json({
//       status: "500",
//       message: error.message,
//     });
//   }
// }

// const ubahKredit = async (req, res) => {
//   try {
//     // const bukti = req.file.originalname;

//     const id = req.params.withdraw_id;
//     const { uid } = req.user;
//     const { status } = req.body;
//     let newStatus = status;

//     const ubah_pengajuan = await Activities.findByIdAndUpdate(id, {
//       status: newStatus,
//       // bukti_transfer: bukti,
//       updated_by: uid,
//     });
//     if (status === "ajukan lunas") {
//       $or: [{ newStatus: "lunas" }, { newStatus: "ditolak" }];
//     }

//     res.status(200).json({
//       status: "200",
//       message: "Berhasil merubah data pengajuan berdasarkan Id",
//       ubah_pengajuan,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "500",
//       message: error.message,
//     });
//   }
// };

// const ubahDebit = async (req, res) => {
//   try {
//     // const bukti = req.file.originalname;
//     const id = req.params.withdraw_id;
//     const withdraw = await Activities.findById(id);
//     console.log(withdraw);
//     const { updateBalance, balance } = req.wallet;

//     const jumlah = withdraw.jumlah;
//     const updateJumlah = balance + jumlah;

//     const { uid } = req.user;
//     const { status } = req.body;
//     let newStatus = status;
//     console.log(updateJumlah);

//     const update_balance = await updateBalance.updateOne({
//       balance: updateJumlah,
//     });

//     const ubah_pengajuan = await Activities.findByIdAndUpdate(id, {
//       status: newStatus,
//       // bukti_transfer: bukti,
//       updated_by: uid,
//     });
//     if (status === "ajukan lunas") {
//       $or: [{ newStatus: "lunas", update_balance }, { newStatus: "ditolak" }];
//     }

//     res.status(200).json({
//       status: "200",
//       message: "Berhasil merubah data pengajuan berdasarkan Id",
//       ubah_pengajuan,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "500",
//       message: error.message,
//     });
//   }
// };
module.exports = {
  ajukanPenarikan,
  kredit,
  debit,
  // ubahKredit,
  ubahDebit,
  dataPengajuan,
  daftarPengajuan,
  daftarPengajuanById,
  aktivitasku,
  ubahPengajuan,
  riwayatTerakhir,
  riwayatMasuk,
  riwayatKeluar,
  riwayatPengajuan,
};
