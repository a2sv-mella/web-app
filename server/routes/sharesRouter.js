const { Router } = require("express");
const { getShares } = require("../controllers/sharesController.js");
const sharesRouter = Router();

sharesRouter.get("/", getShares);

module.exports = sharesRouter;
