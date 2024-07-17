const {Router} = require("express");
const {getCurrentUser, updateUser} = require("../controllers/userController");
const userRouter = Router();

userRouter.get("/current-user", getCurrentUser);
userRouter.post("/update-user", updateUser);

module.exports =  userRouter;
