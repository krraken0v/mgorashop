require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const paymentRoutes = require("./routes/paymentRoutes");
const cookieParser = require("cookie-parser");
const RegisterRoute = require("./routes/RegisterRoute");
const LoginRoute = require("./routes/LoginRoute");
const itemPageRoute = require("./routes/itemPageRoute");
const SearchRoute = require("./routes/SearchRoute");
const { PrismaClient } = require("./generated/prisma");
const newLocal = "./routes/productRoutes";
const AuthRoute = require("./routes/AuthRoute");
const FavoriteRoute = require("./routes/FavoriteRoute");
const orderRoutes = require("./routes/orderRoutes");
const AuthExit = require("./routes/AuthExit");
const CartRoute = require("./routes/CartRoute");
const CategoryRoute = require("./routes/CategoryRoute");
const productRoutes = require(newLocal);
const app = express();
const cors = require("cors");
const CommentRoutes = require("./routes/CommentRoutes");
const morgan = require("morgan");
const prisma = new PrismaClient();
app.set("prisma", prisma);
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/api/search", SearchRoute);
app.use("/api/register", RegisterRoute);
app.use("/api/login", LoginRoute);
app.use("/payment", paymentRoutes);
app.use("/api/addtocart", CartRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/authexit", AuthExit);
app.use("/api/comments", CommentRoutes);
app.use("/api/products", CategoryRoute);
app.use("/api/itempage", itemPageRoute);
app.use("/api/favorites", FavoriteRoute);
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
