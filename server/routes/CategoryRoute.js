const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
router.get("/", async (req, res) => {
  const productParam = req.query.sort;
  try {
    if (!productParam) {
      res.status(404).json({ message: "Невозможно отфильтровать" });
    } else if (productParam) {
      const products = await Product.find({ category: productParam }).sort({
        price: -1,
      });
      const finalproducts = products;
      return res.status(200).json(finalproducts);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ошибка сервера при фильтрации" });
  }
});
module.exports = router;
