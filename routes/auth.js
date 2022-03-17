import express from "express";
const Router = express;
import bcrypt from "bcryptjs"; 
import crypto from "crypto"; // для генерации пароля(при восстановлении пароля)
import User from "../models/user.js";
const router = Router();
import mailconfig from "../mailconfig/sendmail.js";
const { sendMail, resetPassSendMail } = mailconfig;

router.get("/login", async (req, res) => {
  res.render("auth/login", {
    title: "Авторизация",
    isLogin: true,
    loginError: req.flash("loginError"),
    registerError: req.flash("registerError"),
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login#login");
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password);
      if (areSame) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          if (err) {
            throw err;
          }
          res.redirect("/");
        });
      } else {
        req.flash("loginError", "The password is incorrect");
        res.redirect("/auth/login#login");
      }
    } else {
      req.flash("loginError", "This user does not exist");
      res.redirect("/auth/login#login");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, repeat, name } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      req.flash("registerError", "User with this e-mail already exists");
      res.redirect("/auth/login#register");
    } else {
      const hashPassword = await bcrypt.hash(
        password,
        10 /*<--длина строки для шифрования*/
      );
      const user = new User({
        email,
        name,
        password: hashPassword,
      });
      await user.save();
      res.redirect("/auth/login#login");
      sendMail(user.email, user.name);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/reset", (req, res) => {
  return res.render("auth/reset", {
    tile: "Have you forgotten your password??",
    error: req.flash("error"),
  });
});

router.post("/reset", (req, res) => {
  try {
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        req.flash("error", "Something went wrong, please try again later");
        return res.redirect("/auth/reset");
      }
      const token = buffer.toString("hex");
      const candidate = await User.findOne({ email: req.body.email });
      if (candidate) {
        candidate.resetToken = token;
        candidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
        await candidate.save();
        resetPassSendMail(candidate.email, token); 
        res.redirect("/auth/login");
      } else {
        req.flash("error", "There is no such email");
        res.redirect("/auth/reset");
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/password/:token", async (req, res) => {
  if (!req.params.token) {
    return res.redirect("/auth/login");
  }
  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExp: { $gt: Date.now() }, //сравниваем чтобы время жизни токена было больще, чем текущая дата(короче-он еще действителен?)
    });
    if (!user) {
      return res.redirect("/auth/login");
    } else {
      return res.render("auth/password", {
        tile: "Restore access",
        error: req.flash("error"),
        userId: user._id.toString(),
        token: req.params.token,
      });
    }
  } catch (e) {
    console.log(e);
  }
});

router.post("/password", async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.body.userId,
      resetToken: req.body.token,
      resetTokenExp: { $gt: Date.now() },
    });
    if (user) {
      user.password = await bcrypt.hash(req.body.password, 10);
      user.resToken = undefined;
      user.resetTokenExp = undefined;
      await user.save();
      res.redirect("/auth/login");
    } else {
      req.flash("loginError", "Token expired");
      res.redirect("/auth/login");
    }
  } catch (e) {
    console.log(e);
  }
});

export default router;
