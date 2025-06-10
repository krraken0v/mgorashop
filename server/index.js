const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 500;

app.use(cors());
app.use(express.json());

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working...");
});

app.listen(PORT, () => {
  console.log(`Server is working on http://localhost${PORT}`);
});
