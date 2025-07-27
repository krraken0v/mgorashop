const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const mongoose = require("mongoose");
const AuthMiddleWare = require("../middlewares/Auth");
router.post("/:productId", AuthMiddleWare, async (req, res) => {
  const { productId } = req.params;
  const prisma = req.app.get("prisma");
  const userId = req.user.id;
  if (!userId) {
    res.status(400).json({
      message: "нужно войти или зарегестрироваться для добавления товара",
    });
  }
  try {
    const findUnique = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
    if (!findUnique) {
      const createFavorite = await prisma.favorite.create({
        data: {
          userId,
          productId,
        },
      });
      res.status(200).json({
        message: "Успешно добавлено в избранное",
        content: createFavorite,
      });
    } else {
      res
        .status(400)
        .json({ message: "Вы уже добавили этот продукт в избранное" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "ошибка сервера при добавлении в избранное" });
  }
});
router.get("/", AuthMiddleWare, async (req, res) => {
  try {
    const prisma = req.app.get("prisma");
    const userId = req.user.id;
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      select: { productId: true },
    });
    const ids = favorites.map((fav) => fav.productId);
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
