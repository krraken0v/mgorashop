const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middlewares/Auth");
router.post("/", AuthMiddleWare, async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Пользователь не зарегестрирован" });
  }
  try {
    res
      .clearCookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
      })
      .status(200)
      .json({ message: "Пользователь успешно вышел" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Произошла ошибка сервера" });
  }
});
module.exports = router;
