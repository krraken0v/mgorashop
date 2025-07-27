const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middlewares/Auth");
router.get("/", AuthMiddleWare, async (req, res) => {
  try {
    res.status(200).json({ message: "Успешно авторизован", id: req.user.id });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
