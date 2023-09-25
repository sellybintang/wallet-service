const mongoose = require("mongoose");

const walletSchema = mongoose.Schema({
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
module.exports = mongoose.model('Wallet', walletSchema)
