const { Router } = require("express");
const {
  available,
  find,
  create,
  proceedToPayment,
  updateShare,
} = require("../controllers/campaignController.js");

const campaignRouter = Router();

// Specific routes first
campaignRouter.get("/available", available);
campaignRouter.post("/proceed-to-payment", proceedToPayment);
campaignRouter.put("/update-share", updateShare); 

// Parameterized route last to avoid catching other requests
campaignRouter.get("/:id", find);
campaignRouter.post("/", create);

module.exports = campaignRouter;


// create campiagn- create a new campaign according to the the campaign schema and return the created campaign
// proceed to payment - redirect to the payement gateway , and return the payment status-- hold the data from the request body
// question for the team: what conformation can they send to the server or to the client to confirm the payment
// once confirmed, update the campaign with the new amount, insert the data on the share table and return the updated campaign -- doesnt need a router
// on product table, update the current amount of share sold
