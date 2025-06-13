const express = require("express");
const validator = require("validator");
const Order = require("../models/Order");
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, adress, items } = req.body;
    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !adress.trim() ||
      !Array.isArray(items) ||
      items.length == 0 ||
      !validator.isEmail(email) ||
      !validator.isMobilePhone(phone, "any")
    ) {
      return res
        .status(400)
        .json({ message: "Введены некорректные данные заказа" });
    }
    const newOrder = new Order({
      name,
      email,
      phone,
      adress,
      items,
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
module.exports = router;
