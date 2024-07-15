const { Router } = require("express");
const { available, find } = require("../controllers/campaignController.js");

const campaignRouter = Router();

campaignRouter.get("/available", available);
campaignRouter.get("/:id", find);


module.exports = campaignRouter;
