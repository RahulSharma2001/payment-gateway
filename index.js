const express = require("express");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
const connectDb = require("./db/config");
const dotenv = require("dotenv").config();
const swaggerDocs = require("./swagger");
const app = express();
const PORT = 3000;

app.use(express.json());
connectDb();

app.use("/api/auth", userRouter);
app.use("/api", paymentRouter);

swaggerDocs(app);

app.listen(PORT, () => console.log("Server up and running"));
