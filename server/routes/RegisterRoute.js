const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
router.post(
  "/",
  [
    body("username")
      .isLength({ min: 3 })
      .trim()
      .withMessage("Ваше имя слишком мало или велико"),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Введен неправильный формат E-Mail"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Слишком маленький пароль"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const prisma = req.app.get("prisma");
    const { username, email, password } = req.body;
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res.status(400).json({ message: "Пользователь уже существует" });
      }
      const hashedPass = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPass,
        },
      });
      const token = jwt.sign({ id: newUser.id }, process.env.SECRET_JWT, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json({
        message: "Пользователь успешно создан",
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Не удалось зарегестрировать пользователя" });
    }
  }
);
module.exports = router;
