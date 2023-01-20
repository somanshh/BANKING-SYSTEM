const Customer = require("../models/customers");
const Transfer = require("../models/transfers");

exports.sendMoneyPage = async (req, res) => {
  const reciever = await Customer.findById(req.params.id);

  res.status(201).render("send", { reciever });
};

exports.addTransfer = async (req, res) => {
  try {
    const sender = await Customer.findOne({ email: req.body.email });

    const reciever = await Customer.findById(req.params.id);
    console.log(sender, reciever);

    if (!sender) {
      var notSender = true;
      return res.status(201).render("send", { reciever, notSender });
    }

    if (req.body.email == reciever.email) {
      var sameEmail = true;
      return res.status(201).render("send", { reciever, sameEmail });
    }

    if (parseInt(req.body.AmountTransfered) > sender.currentBalance) {
      var notMoney = sender.currentBalance;

      return res.render("send", { reciever, notMoney });
    }

    const AmountTransfered = req.body.AmountTransfered;
    console.log(AmountTransfered);
    const newTransfer = {
      reciever,
      sender,
      AmountTransfered,
    };

    const transfer = await Transfer.create(newTransfer);

    sender.transferHistory.push(transfer._id);
    sender.currentBalance -= parseInt(AmountTransfered);
    sender.transferedBalance += parseInt(AmountTransfered);
    sender.save();

    reciever.recievedHistory.push(transfer._id);
    reciever.currentBalance += parseInt(AmountTransfered);
    reciever.recievedBalance += parseInt(AmountTransfered);
    reciever.save();

    var succsess = true;
    res.status(200).render("reciept", { reciever, sender, succsess, transfer });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.find({})
      .sort({ transferedDate: -1 })
      .populate("sender")
      .populate("reciever");

    res.status(201).render("transfers", { transfers });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const transfer = await Transfer.remove({});

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
