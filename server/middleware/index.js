const { authenticateUser } = require("./authMiddleware");
const { authenticateDeveloper } = require("./developerAuthMiddleware");
const errorHandlerMiddleware = require("./errorHandlerMiddleware");

module.exports = {
  authenticateUser,
  errorHandlerMiddleware,
  authenticateDeveloper,
};
