const {
  UnauthenticatedError,
  UnauthorizedError,
} = require("../errors/customErrors.js");
const { verifyJWT } = require("../utils/tokenUtils.js");

const authenticateDeveloper = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");
  try {
    const user = verifyJWT(token);
    const { user_id, role } = user;

    if (role === "developer") {
      req.user = { user_id, role };
      next();
    } else {
      throw new UnauthorizedError("not authorized to access this route");
    }
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

module.exports = { authenticateDeveloper };
