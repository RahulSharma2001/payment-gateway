const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose
    .connect(
      "mongodb+srv://sharma123:rahul123@cluster0.ejosyev.mongodb.net/payment?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("DB connected Successfully"))
    .catch((e) => console.log("Error occured", e));
};

module.exports = connectDb;
