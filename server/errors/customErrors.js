const { StatusCodes } = require("http-status-codes");

module.exports = {
  UnauthenticatedError: class UnauthenticatedError extends Error {
    constructor(message) {
      super(message);
      this.name = "UnauthenticatedError";
      this.statusCode = StatusCodes.UNAUTHORIZED;
    }
  },
  // Add other classes following the same pattern when sending errors
};
