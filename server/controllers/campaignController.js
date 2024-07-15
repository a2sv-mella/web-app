const { StatusCodes } = require("http-status-codes");
const { Campaign, Share } = require("../models");

const available = async (req, res) => {
  try {
    // TODO: Implement available campaigns
    // Retrieves the available campaigns from database.
    // Campaigns are considered available if the current amount is less than the goal amount.
    
    
      res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
const find = async (req, res) => {
  try {
    // TODO: Implement find a campaign
    // Retrieves campaign data for specific campaign.
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
// create campiagn- create a new campaign according to the the campaign schema and return the created campaign
const create = async (req, res) => {
  try {
    // Extract data from request body
    const {
      product_id,
      goal_amount,
      price_per_share,
      current_amount,
      end_date,
      description,
    } = req.body;

    // Optional: Validate data here

    // Insert data into database
    const newCampaign = await Campaign.create({
      product_id,
      goal_amount,
      price_per_share,
      current_amount: current_amount || 0, // Use provided value or default to 0
      end_date,
      description,
    });

    // Send success response
    res.status(201).json({
      message: "Campaign created successfully",
      campaign: newCampaign,
    });
  } catch (error) {
    // Send error response
    res.status(500).json({
      message: "Error creating campaign",
      error: error.message,
    });
  }
};

const proceedToPayment = async (req, res) => {
  try {
    // Extract data from request body
    const { campaign_id, amount } = req.body;

    // Optional: Validate data here

    // Proceed to payment gateway
  } catch (error) {
    // Send error response
    res.status(500).json({
      message: "Error proceeding to payment",
      error: error.message,
    });
  }
};
const updateShare = async (req, res) => {
  try {
    const { payment_id, user_id, product_id, amount_of_share } = req.body;

    // Fetch current shares for the developer and the user
    const developerShare = await Share.findOne({
      where: { user_id: developerId, product_id },
    });
    const userShare = await Share.findOne({ where: { user_id, product_id } });

    // Calculate new shares
    const newDeveloperShareAmount =
      developerShare.amount_of_share - amount_of_share;
    const newUserShareAmount = userShare
      ? userShare.amount_of_share + amount_of_share
      : amount_of_share;

    // Update developer's share
    await Share.update(
      { amount_of_share: newDeveloperShareAmount },
      { where: { user_id: developerId, product_id } }
    );

    // Update or create user's share
    if (userShare) {
      await Share.update(
        { amount_of_share: newUserShareAmount },
        { where: { user_id, product_id } }
      );
    } else {
      await Share.create({
        payment_id,
        user_id,
        product_id,
        amount_of_share: newUserShareAmount,
      });
    }

    res.status(201).json({
      message: "Share updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating share",
      error: error.message,
    });
  }
};

module.exports = { available, find, proceedToPayment, create, updateShare };

