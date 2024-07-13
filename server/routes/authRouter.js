const { Router } = require("express");
const { login, logout, register } = require("../controllers/authController.js");
const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);

module.exports = authRouter;
