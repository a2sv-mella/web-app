const { Router } = require("express");
const { buySmuni, payWithSmuni } = require("../controllers/smuniControllers");
const smuniRouter = Router();

smuniRouter.post("/buy", buySmuni);
smuniRouter.post("/pay", payWithSmuni);

module.exports = smuniRouter;
