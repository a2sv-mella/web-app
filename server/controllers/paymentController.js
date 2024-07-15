const { StatusCodes } = require("http-status-codes");
require("dotenv").config();
const request = require("request");
const { promisify } = require("util");
const db = require("../models/db.js");

const requestPromise = promisify(request);
const initialize = async (req, res) => {
  try {
    // TODO : Validation on the req.body
    const key = req.headers.authorization
    const product_id = req.body.product_id

    const developerQuery = "SELECT developer_id FROM products WHERE product_id = $1"
    const developerResult = await db.query(developerQuery, [product_id])
    const developer_id = developerResult.rows[0].developer_id

    const keyQuery = "SELECT private_key, public_key FROM developers WHERE developer_id = $1"
    const keyResult = await db.query(keyQuery, [developer_id])
    
    console.log(keyResult.rows[0], key)
    const private_key = keyResult.rows[0].private_key
    const public_key = keyResult.rows[0].public_key

    if (key !== private_key && key !== public_key) {
      res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: "Internal Server Error" });
      return
    }

    req.body.callback_url = process.env.MELLA_CALLBACK;
    const options = {
      method: "POST",
      url: process.env.CHAPA_URL,
      headers: {
        Authorization: `Bearer ${process.env.PRIVATE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    };
    let paymentDetails = JSON.parse(options.body);

    const query = `
      INSERT INTO payments (tx_ref, currency, product_id,amount, email,
      first_name, last_name, phone_number, callback_url, return_url, description, payment_type)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12)
      RETURNING *`;

    const values = [
      paymentDetails.tx_ref,
      paymentDetails.currency,
      paymentDetails.product_id,
      paymentDetails.amount,
      paymentDetails.email,
      paymentDetails.first_name,
      paymentDetails.last_name,
      paymentDetails.phone_number,
      paymentDetails.sender_callback,
      paymentDetails.return_url,
      paymentDetails.customization["description"],
      paymentDetails.payment_type,
    ];
    const result = await db.query(query, values);
    const paymentInfo = result.rows[0];

    if (paymentDetails.payment_type === "donation") {
      const donationQuery = `
        INSERT INTO donations (payment_id,product_id,amount,message)
        VALUES ($1, $2, $3, $4)
        RETURNING *`;

      const values = [
        paymentInfo.payment_id,
        paymentDetails.product_id,
        paymentDetails.amount,
        paymentDetails.customization["description"],
      ];
      await db.query(donationQuery, values);
    }

    if (paymentDetails.payment_type === "smuni") {
      const user_id = req.user["user_id"];
      const smuniQuery = `
      INSERT INTO smuni (payment_id, user_id, amount)
VALUES ($1, $2, $3) RETURNING *;`;

      const values = [
        paymentInfo.payment_id,
        user_id,
        paymentDetails.amount*4,
      ];
      await db.query(smuniQuery, values);
    }
    // TODO : Use axios to handle request 
    const response = await requestPromise(options);

    // TODO : Validate jsonReponse before sending.
    const jsonResponse = JSON.parse(response.body);

    res.send(jsonResponse);
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const verify = async (req, res) => {
  try {
    const transaction = req.query;

    delete transaction.callback;
    delete transaction._;

    const tx_ref = transaction.trx_ref;
    const selectQuery = "SELECT * FROM payments WHERE tx_ref = $1";
    const selectResult = await db.query(selectQuery, [tx_ref]);

    if (selectResult.rows.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Transaction reference not found" });
    }

    const callback_url = selectResult.rows[0].callback_url;
    const payment_id = selectResult.rows[0].payment_id;
    const date = new Date();
    const timestampWithOptions = date.toLocaleString("en-US", {
      timeZone: "Africa/Nairobi",
    });

    const query = `
      UPDATE payments SET status = TRUE WHERE payment_id = $1 RETURNING *`;

    const result = await db.query(query, [payment_id]);

    transaction.payment_made = timestampWithOptions;
    transaction.payment_id = payment_id;

    if (callback_url) {
      const options = {
        method: "GET",
        url: callback_url,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      };
      const response = await requestPromise(options);
    }

    res.status(StatusCodes.OK).json(result.rows[0]);
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = { initialize, verify };
