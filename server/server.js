require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require('./routes/adminRoutes');
const newLocal = "./routes/productRoutes";
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require(newLocal);
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const MONGO_URI = "";
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use('/orders',adminRoutes);
app.use("/payment", paymentRoutes);
mongoose
  .connect(MONGO_URI)
  .then(console.log("MongoDB is Connected"))
  .catch((err) => console.log(`MongoDBerror : ${err}`));
app.get("/", (req, res) => {
  res.send("Mgorashop is running");
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
