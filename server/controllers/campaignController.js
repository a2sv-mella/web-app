const { StatusCodes } = require("http-status-codes");
const db = require("../models/db.js");
const { query } = require("express");

const available = async (req, res) => {
  try {
    // TODO: Implement available campaigns
    // Retrieves the available campaigns from database.
    // Campaigns are considered available if the current amount is less than the goal amount.
    const availableCampaignsQuery = `SELECT * FROM campaigns`;
    const availableCampaigns = await db.query(availableCampaignsQuery);
    const availableCampaignsResult = availableCampaigns.rows;
    // console.log( availableCampaignsResult);
    let campaignsData = [];
    await Promise.all(
      availableCampaignsResult.map(async (element) => {
        const product_id = element.product_id;
        const created_At = element.created_at;
        console.log(product_id);

        const developerIdquery = `SELECT developer_id FROM products WHERE product_id = $1`;
        const developerIdResult = await db.query(developerIdquery, [
          product_id,
        ]);
        const developer_Id = developerIdResult.rows[0].developer_id;

        const companyNameQuery = `SELECT name FROM products WHERE product_id = $1`;
        const companyNameResult = await db.query(companyNameQuery, [
          product_id,
        ]);
        const company_name = companyNameResult.rows[0].name;

        const locationQuery = `SELECT location FROM products WHERE product_id = $1`;
        const locationResult = await db.query(locationQuery, [product_id]);
        const location = locationResult.rows[0].location;

        const user_id = req.user.user_id;
        const userQuery = `SELECT first_name, last_name FROM users WHERE user_id = $1`;
        const userQueryResult = await db.query(userQuery, [user_id]);
        const developer = userQueryResult.rows[0];
        const name = developer.first_name + " " + developer.last_name;
        campaignsData.push({
          id: product_id,
          developer: name,
          location: location,
          createdAt: created_At,
          company_name: company_name,
        });
        // console.log(campaignsData);
      })
    );
    console.log(campaignsData);
    const data = { fundsFound: campaignsData };
    console.log(data);
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
const find = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const developerQuery =
      "SELECT developer_id FROM developers WHERE user_id = $1";
    const developerQueryResult = await db.query(developerQuery, [user_id]);
    const developer_id = developerQueryResult.rows[0].developer_id;
    const productQuery =
      "SELECT product_id FROM products WHERE developer_id = $1";
    const productQueryResult = await db.query(productQuery, [developer_id]);
    const product_id = productQueryResult.rows[0].product_id;
    const campaignQuery = "SELECT * FROM campaigns WHERE product_id =  $1 ";
    const campaignQueryResult = await db.query(campaignQuery, [product_id]);
    const campaign = campaignQueryResult.rows[0];
    res.status(StatusCodes.OK).json({ campaign });
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
    // select developer_id using user_id
    const user_id = req.user.user_id;

    const developerQuery =
      "SELECT developer_id FROM developers WHERE user_id = $1";
    const developerQueryResult = await db.query(developerQuery, [user_id]);
    const developer_id = developerQueryResult.rows[0].developer_id;
    const productQuery =
      "SELECT product_id FROM products WHERE developer_id = $1";
    const productQueryResult = await db.query(productQuery, [developer_id]);
    const product_id = productQueryResult.rows[0].product_id;
    const {
      goal_amount,
      price_per_share,

      end_date,
      description,
    } = req.body;

    // Optional: Validate data here

    // Insert data into database
    const insertcampaignQuery =
      "INSERT INTO campaigns (product_id, goal_amount,price_per_share, end_date, description) VALUES ($1, $2, $3, $4, $5)";
    const campaignData = await db.query(insertcampaignQuery, [
      product_id,
      goal_amount,
      price_per_share,

      end_date,
      description,
    ]);
    console.log(campaignData.rows[0]);
    // Send success response
    res.status(StatusCodes.OK).json({
      message: "Campaign created successfully",
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
