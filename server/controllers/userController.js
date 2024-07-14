const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const { UnauthenticatedError } = require("../errors/customErrors");
const db = require("../models/db");

const getCurrentUser = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const query = "SELECT * FROM users WHERE user_id = $1";
    const result = await db.query(query, [user_id]);

    if (result.rows.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    let user = result.rows[0];
    delete user.password;

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const {
      first_name,
      middle_name,
      last_name,
      email,
      phone,
      old_password,
      new_password,
    } = req.body;

    const userQuery = "SELECT * FROM users WHERE user_id = $1";
    const result = await db.query(userQuery, [user_id]);

    if (result.rows.length === 0) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(old_password, user.password);
    if (passwordMatch) {
      // TODO : Add data validation on the data to be inserted.

      const newHashedPassword = await bcrypt.hash(new_password, 10);
      const newQuery =
        "UPDATE users SET email = $1, first_name = $2, last_name = $3, middle_name = $4 , password = $5, phone_number = $6 WHERE user_id = $7 RETURNING *";

      const updateResult = await db.query(newQuery, [
        email,
        first_name,
        last_name,
        middle_name,
        newHashedPassword,
        phone,
        user_id,
      ]);

      res.status(StatusCodes.OK).json({ msg: "User Updated" });
    } else {
      throw new UnauthenticatedError("Invalid Credentials");
    }
  } catch (error) {
    console.error("Error updating user:", error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = { getCurrentUser, updateUser };
