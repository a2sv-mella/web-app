const { Router } = require("express");
const { initialize, verify } = require("../controllers/paymentController");
const paymentRouter = Router();

paymentRouter.post("/initialize", initialize);
paymentRouter.get("/verify", verify);

module.exports = paymentRouter;
