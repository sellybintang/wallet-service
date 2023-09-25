const Wallet = require("../models/walletSchema");

const buatDompet = async (req, res) => {
  try {
    const { uid, role, nama } = req.user;
    const buatDompet = await Wallet.create({
      user_id: uid,
      name: nama,
      role: role,
    });

    res.status(200).json({
      status: "200",
      message: "Sukses membuat dompet",
      buatDompet,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

const semuaDompet = async (req, res) => {
  try {
    const dompetku = await Wallet.find();

    res.status(200).json({
      status: "200",
      message: "Sukses membuat dompet",
      dompetku,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

const dompetku = async (req, res) => {
  try {
    // const user_id= req.user.uid
    const id = req.params.user_id;
    const dompetku = await Wallet.find({ user_id: id });

    res.status(200).json({
      status: "200",
      message: "Sukses membuat dompet",
      dompetku,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

const updateDompet = async (req, res) => {
  try {
    const id = req.params.user_id;
    const { name } = req.body;
    const update = await Wallet.updateOne({ user_id: id }, { name: name });

    res.status(200).json({
      status: "200",
      message: "Sukses mengubah nama dompet",
      update,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

const hapusDompet = async (req, res) => {
  try {
    const id = req.params.user_id;
    const hapusDompet = await Wallet.deleteOne({ _id: id });

    res.status(200).json({
      status: "200",
      message: `Sukses menghapus user_id :${id}`,
      hapusDompet,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};
module.exports = {
  buatDompet,
  semuaDompet,
  dompetku,
  updateDompet,
  hapusDompet,
};
