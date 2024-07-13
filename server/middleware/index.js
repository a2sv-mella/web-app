const { authenticateUser } = require("./authMiddleware");
const errorHandlerMiddleware = require("./errorHandlerMiddleware");

module.exports = { authenticateUser, errorHandlerMiddleware };
