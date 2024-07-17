const { StatusCodes } = require("http-status-codes");
const request = require("request");
const { promisify } = require("util");
const db = require("../models/db.js");

const requestPromise = promisify(request);
const available = async (req, res) => {
  try {
    // Campaigns are considered available if the current amount is less than the goal amount.
    // TODO : add validation to check if the time has not passed as well

    const availableCampaignsQuery = `SELECT * FROM campaigns WHERE goal_amount > current_amount`;
    const availableCampaigns = await db.query(availableCampaignsQuery);
    const availableCampaignsResult = availableCampaigns.rows;

    let campaignsData = [];

    await Promise.all(
      availableCampaignsResult.map(async (element) => {
        const product_id = element.product_id;
        const created_At = element.created_at;

        const productQuery = `SELECT developer_id,name,location FROM products WHERE product_id = $1`;
        const productQueryData = await db.query(productQuery, [product_id]);
        const productData = productQueryData.rows[0];

        const developer_id = productData.developer_id;
        const product_name = productData.name;
        const location = productData.location;

        const developerQuery = `SELECT user_id FROM developers WHERE developer_id = $1`;
        const developerQueryResult = await db.query(developerQuery, [
          developer_id,
        ]);
        const developer = developerQueryResult.rows[0];

        const developer_user_id = developer.user_id;

        const devDataQuery = `SELECT first_name,last_name FROM users WHERE user_id = $1`;
        const devDataQueryResult = await db.query(devDataQuery, [
          developer_user_id,
        ]);
        const developerTableData = devDataQueryResult.rows[0];

        const developer_name =
          developerTableData.first_name + " " + developerTableData.last_name;
        campaignsData.push({
          product_id: product_id,
          campaign_id: element.campaign_id,
          developer: developer_name,
          location: location,
          createdAt: created_At,
          company_name: product_name,
        });
      })
    );
    const data = { fundsFound: campaignsData };
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
const getter = async (req, res) => {
  try {
    const campaign_id = req.params.id;
    // console.log(campaign_id);

    const campaignQuery = "SELECT * FROM campaigns WHERE campaign_id = $1";
    const campaignQueryResult = await db.query(campaignQuery, [campaign_id]);

    const campaignData = campaignQueryResult.rows[0];
    const product_id = campaignData.product_id;

    const productQuery = "SELECT name FROM products WHERE product_id = $1";
    const productQueryResult = await db.query(productQuery, [product_id]);

    const productData = productQueryResult.rows[0];

    const product_name = productData.name;
    const goal = campaignData.goal_amount;
    const current_amount = campaignData.current_amount;
    const price_per_share = campaignData.price_per_share;
    const description = campaignData.description;

    const data = {
      product_name,
      product_id,
      goal,
      current_amount,
      price_per_share,
      description,
    };

    res.status(StatusCodes.OK).json({ data });
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
const create = async (req, res) => {
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

    const { amount, price_per_share, end_date, description } = req.body;
    const goal_amount = price_per_share * amount;

    // TODO: Validate data here

    const insertcampaignQuery =
      "INSERT INTO campaigns (product_id, goal_amount,price_per_share, end_date, description) VALUES ($1, $2, $3, $4, $5)";
    const campaignData = await db.query(insertcampaignQuery, [
      product_id,
      goal_amount,
      price_per_share,
      end_date,
      description,
    ]);

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

const buyCampaign = async (req, res) => {
  try {
    const { shares, product_id, price_per_share } = req.body;
    const user_id = req.user["user_id"];

    if (shares === 0) {
      res.status(StatusCodes.FORBIDDEN).json({ error: "Empty Shares" });
    }

    const random = Math.floor(Math.random() * 10000);
    const currentTime = new Date().getTime();

    const tx_ref = `melatest-${random}-${currentTime}-${user_id}-${product_id}`;

    const query =
      "SELECT first_name,last_name,email,phone_number FROM users WHERE user_id = $1";
    const userQueryData = await db.query(query, [user_id]);
    const userData = userQueryData.rows[0];
    const { email, first_name, last_name, phone_number } = userData;

    const price = price_per_share * shares;
    const data = {
      amount: price,
      currency: "ETB",
      user_id: user_id,
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone_number: "0913405421",
      product_id: product_id,
      developer_id: 1,
      payment_type: "crowdFund",
      tx_ref: tx_ref,
      customization: {
        title: "Mella Crowd Fund",
        description: `To buy ${shares} shares from Mella.`,
      },
    };

    req.body.callback_url = process.env.MELLA_CALLBACK;

    authQuery = "SELECT private_key FROM developers WHERE developer_id = $1";
    const authResult = await db.query(authQuery, [data.developer_id]);
    const private_key = authResult.rows[0].private_key;
    const options = {
      method: "POST",
      url: process.env.MELLA_INITIALIZE,
      headers: {
        authorization: private_key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await requestPromise(options);
    const jsonResponse = JSON.parse(response.body);

    const fundInsertQuery = `INSERT INTO shares (user_id,product_id,amount_of_share,tx_ref) VALUES ($1,$2,$3,$4)`;
    const fundInsertQueryResult = await db.query(fundInsertQuery, [
      user_id,
      product_id,
      shares,
      tx_ref,
    ]);

    res.send(jsonResponse);
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
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

module.exports = {
  available,
  find,
  create,
  updateShare,
  getter,
  buyCampaign,
};
