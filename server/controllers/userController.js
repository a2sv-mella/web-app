const { StatusCodes } = require("http-status-codes");
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
    // TODO: Implement updatingUser's credentials
    // This function updates the credentials (e.g., username, password) of a user.
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = { getCurrentUser, updateUser };
