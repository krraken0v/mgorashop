const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middlewares/Auth");
const Product = require("../models/Product");
const mongoose = require("mongoose");
router.post("/:productId", AuthMiddleWare, async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const prisma = req.app.get("prisma");
  const token = req.cookies.token;
  if (!token) {
    res
      .status(401)
      .json({ message: "Нужно войти чтобы добавить товары в корзину" });
  }
  try {
    const find = await prisma.cart.findUnique({
      where: { userId_productId: { userId, productId } },
    });
    if (find) {
      res.status(400).json({ message: "Товар уже был добавлен в корзину" });
    }
    const newCartItem = await prisma.cart.create({
      data: {
        userId,
        productId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    res.status(200).json({
      message: "Товар успешно добвален в корзину",
      newCartItem: newCartItem,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Ошибка сервера при добавлении товара в корзину" });
  }
});
router.get("/", AuthMiddleWare, async (req, res) => {
  try {
    const prisma = req.app.get("prisma");
    const userId = req.user.id;
    const cartitems = await prisma.cart.findMany({
      where: { userId },
      select: { productId: true },
    });
    const ids = cartitems.map((fav) => fav.productId);
    const products = await Product.find({
      _id: { $in: ids.map((id) => new mongoose.Types.ObjectId(id)) },
    });
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ошибка при отображении избранного" });
  }
});
module.exports = router;
