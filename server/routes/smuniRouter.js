const { Router } = require("express");
const {
  buySmuni,
  payWithSmuni,
  getSmuniPaymentData,
  initializeWithSmuni,
} = require("../controllers/smuniControllers");
const smuniRouter = Router();

smuniRouter.get("/get/:id", getSmuniPaymentData);
smuniRouter.post("/buy", buySmuni);
smuniRouter.post("/pay", payWithSmuni);
smuniRouter.post("/initialize", initializeWithSmuni);

module.exports = smuniRouter;
