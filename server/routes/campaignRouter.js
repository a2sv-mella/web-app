const { Router } = require("express");
const {
  available,
  find,
  create,
  getter,
  buyCampaign,
} = require("../controllers/campaignController.js");

const campaignRouter = Router();

campaignRouter.get("/", find);
campaignRouter.get("/get/:id", getter);
campaignRouter.get("/available", available);
campaignRouter.post("/create", create);
campaignRouter.post("/buy", buyCampaign);

module.exports = campaignRouter;
