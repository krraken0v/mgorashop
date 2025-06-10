require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const newLocal = "./routes/productRoutes";
const productRoutes = require(newLocal);
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const MONGO_URI = "";
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/products", productRoutes);
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
