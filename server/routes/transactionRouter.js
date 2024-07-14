const { Router } = require("express");
const getTransactions = require("../controllers/transactionController.js");
const transRouter = Router();

transRouter.get("/", getTransactions);

module.exports = transRouter;
