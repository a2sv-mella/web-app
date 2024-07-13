const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const db = require("../models/db");
const { UnauthenticatedError } = require("../errors/customErrors");
const { createJWT } = require("../utils/tokenUtils");

function generateRandomCharacters(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*(){}|:";0123456789';
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, business_name, role } =
      req.body;

    const findUserQuery = "SELECT email FROM users WHERE email = $1";
    const result = await db.query(findUserQuery, [email]);

    if (result.rows.length !== 0) {
      res.status(StatusCodes.CONFLICT).json({ msg: "User Already Exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertUserQuery = `INSERT INTO users (first_name,last_name, email, password,role) VALUES ($1, $2, $3, $4, $5)`;
    const userData = await db.query(insertUserQuery, [
      first_name,
      last_name,
      email,
      hashedPassword,
      role,
    ]);
    
    if (role === "developer") {
      const getLastElementQuery = `SELECT * FROM users ORDER BY user_id DESC LIMIT 1`;
      const lastElement = await db.query(getLastElementQuery);
      const user_id = lastElement.rows[0].user_id;
      const company_name = business_name;
      const PRIVATE_KEY = `MELPRVK_${generateRandomCharacters(10)}`;
      const PUBLIC_KEY = `MELPUBK_${generateRandomCharacters(10)}`;
      const ENCRYPTION_KEY = generateRandomCharacters(16);
      const insertDeveloperQuery = `INSERT INTO developers(user_id,private_key,public_key,encryption_key,company_name) VALUES ($1, $2, $3, $4, $5)`;
      await db.query(insertDeveloperQuery, [
        user_id,
        PRIVATE_KEY,
        PUBLIC_KEY,
        ENCRYPTION_KEY,
        company_name,
      ]);
    }
    res.status(StatusCodes.CREATED).json({ msg: "User created" });
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userQuery = "SELECT * FROM users WHERE email = $1";
    const result = await db.query(userQuery, [email]);

    if (result.rows.length === 0) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = createJWT({ user_id: user.user_id, role: user.role });
      const oneDay = 1000 * 60 * 60 * 24;
      const future = new Date(Date.now() + oneDay);

      res.cookie("token", token, {
        httpOnly: true,
        expires: future,
        secure: process.env.NODE_ENV === "production",
      });

      res.status(StatusCodes.OK).json({ msg: "User logged in" });
    } else {
      throw new UnauthenticatedError("Invalid Credentials");
    }
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(StatusCodes.OK).json({ msg: "User logged out" });
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = { login, logout, register };
