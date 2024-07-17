const paymentModel = require("../models/payment");

//create Payment
const createPayment = async (req, res) => {
  const userId = req.body.userId;

  const { amount, currency } = req.body;

  console.log(userId, amount, currency);

  try {
    const newPayment = new paymentModel({
      userId,
      amount,
      currency,
    });

    const payment = await newPayment.save();
    res.json({
      success: true,
      message: "Payment Created",
      paymentId: payment._id,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e,
    });
  }
};

//process payment

const processPayment = async (req, res) => {
  const id = req.params.id;

  try {
    const payment = await paymentModel.findById({ _id: id });
    payment.paymentStatus = "complete";

    await payment.save();
    return res.json({
      success: true,
      message: "Payment Proceeded",
      payment,
    });
  } catch (e) {
    return res.json({
      success: false,
      message: "Error occured",
    });
  }
};

// Retrieve payment status
const retrievePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    console.log(paymentId);
    const payment = await paymentModel.findById(paymentId);

    if (!payment) {
      return res.json({
        succes: false,
        message: "Payment Not Found",
      });
    }

    return res.json({
      success: true,
      payment,
    });
  } catch (e) {
    return res.json({
      success: false,
      message: "Error Occured",
    });
  }
};

//refund payment

const refundPayment = async (req, res) => {
  const id = req.params.id;

  try {
    const payment = await paymentModel.findById({ _id: id });
    payment.paymentStatus = "refunded";

    await payment.save();
    return res.json({
      success: true,
      message: "Payment Refunded",
      payment,
    });
  } catch (e) {
    return res.json({
      success: false,
      message: "Error occured",
    });
  }
};

const paymentController = {
  createPayment,
  processPayment,
  retrievePayment,
  refundPayment,
};

module.exports = paymentController;
