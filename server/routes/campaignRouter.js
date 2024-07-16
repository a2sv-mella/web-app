

const { Router } = require("express");
const { available, find, create } = require("../controllers/campaignController.js");

const campaignRouter = Router();

campaignRouter.post("/create", create);
campaignRouter.get("/available", available);
campaignRouter.get("/", find);


module.exports = campaignRouter;
