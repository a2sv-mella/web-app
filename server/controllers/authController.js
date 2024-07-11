const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const db = require("../models/db");

const register = async (req, res) => {
  try {
    // TODO: Implement Registration
    // This function handles the registration process for a user.
    const {password,first_name,last_name,email,role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(req.body);
    const insertUserQuery =
      `INSERT INTO users (first_name,last_name, email, password,role) VALUES ($1, $2, $3, $4, $5)`;
    // await db.query(insertUserQuery, [
    //   first_name,
    //   last_name,
    //   email,
    //   hashedPassword,
    //   role,
    // ]);
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    // TODO: Implement Login
    // This function handles the login process for a user.
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    // TODO: Implement Logout
    // This function handles the logout process for a user.
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = { login, logout, register };
