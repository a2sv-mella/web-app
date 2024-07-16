const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const errorMsg = err.message || `Something went wrong try again`;
  res.status(statusCode).json({ msg: errorMsg });
};
module.exports = errorHandlerMiddleware;
