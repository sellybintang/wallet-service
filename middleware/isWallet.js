const Wallet = require("../models/walletSchema");

// const walletUser = async (req, res, next) => {
//   try {
//     const id = req.params.withdraw_id;
//     const dompetku = await Wallet.findOne({ user_id: id });

//     const newData = {
//       updateBalance: Wallet,
//       balance: dompetku.balance,
//       user_id: dompetku.user_id,
//     };
//     console.log(Wallet);
//     req.wallet = newData;
//     next();
//   } catch (error) {
//     res.status(500).json({
//       status: "500./",
//       message: error.message,
//     });
//   }
// };

const walletUser = async (req, res, next) => {
  try {
    const id = req.params.user_id;
    const dompetku = await Wallet.findOne({ user_id: id });

    const newData = {
      updateBalance: Wallet,
      balance: dompetku.balance,
      user_id: dompetku.user_id,
    };
    console.log(Wallet);
    req.wallet = newData;
    next();
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// const updateBalance = async(req, res,next)=>{
//     try{
//         const id = req.params.user_id;

//         const balance = await Wallet.updateOne({user_id: id}, new :)

//     }catch{

//     }
// }

module.exports = { walletUser };
