const {
  UnauthenticatedError,
  UnauthorizedError,
} = require("../errors/customErrors.js");
const { verifyJWT } = require("../utils/tokenUtils.js");

const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
  if (!token) throw new UnauthenticatedError("authentication invalid");
  try {
    const user = verifyJWT(token);
    console.log(user);
    const { user_id, role } = user;

    req.user = { user_id, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

module.exports = { authenticateUser };
