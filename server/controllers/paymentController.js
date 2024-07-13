const { StatusCodes } = require("http-status-codes");
require('dotenv').config();
const request = require("request");
const { promisify } = require('util');
const db = require('../models/db.js')

const requestPromise = promisify(request);
const initialize = async (req, res) => {

  req.body.callback_url = process.env.MELLA_CALLBACK
  let options = {
    method: "POST",
    url: process.env.CHAPA_URL,
    headers: {
      "Authorization": `Bearer ${process.env.PRIVATE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body)
  };

  console.log(options);
  try {
    const response = await requestPromise(options);
    const jsonResponse = JSON.parse(response.body);

    res.send(jsonResponse.data.checkout_url);
    console.log(jsonResponse);


    let tobeInserted = JSON.parse(options.body)
    const query = `
      INSERT INTO payments (tx_ref, currency, product_id,amount, email,
      first_name, last_name, phone_number, callback_url, return_url, description, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12)
      RETURNING *`;
    const date = new Date();

    const timestampWithOptions = date.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' });
    const values = [tobeInserted.tx_ref,tobeInserted.currency,tobeInserted.product_id,tobeInserted.amount,tobeInserted.email,
      tobeInserted.first_name,tobeInserted.last_name,tobeInserted.phone_number,tobeInserted.sender_callback,tobeInserted.return_url,
      tobeInserted.customization["description"],timestampWithOptions]

    const result = await db.query(query, values);
    const paymentInfo = result.rows[0]
    console.log(paymentInfo)
    if (tobeInserted.payment_type === "donation") {

      const donationQuery = `
        INSERT INTO donations (payment_id,product_id,amount,message,created_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`;

      const timestampWithOptions = date.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' });
      const values = [paymentInfo.payment_id,tobeInserted.product_id,tobeInserted.amount,
        tobeInserted.customization["description"],timestampWithOptions]
      await db.query(donationQuery, values);
    }
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const verify = async (req, res) => {
  try {

    console.log(req.query)
    const transaction = req.query
    const tx_ref = transaction.trx_ref
    const selectQuery = 'SELECT * FROM payments WHERE tx_ref = $1';
    const selectResult = await db.query(selectQuery, [tx_ref]);

    if (selectResult.rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Transaction reference not found' });
    }

    const callback_url = selectResult.rows[0].callback_url;
    const payment_id = selectResult.rows[0].payment_id;
    const date = new Date();
    const timestampWithOptions = date.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' });

    const query = `
      UPDATE payments SET status = TRUE WHERE payment_id = $1 RETURNING *`;

    const result = await db.query(query, [payment_id]);

    transaction.payment_made = timestampWithOptions
    transaction.payment_id = payment_id

    console.log(selectResult.rows[0])

    const options = {
      method: "GET",
      url: callback_url,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transaction)
    };

    const response = await requestPromise(options);

    console.log(response.body)
    res.status(StatusCodes.OK).json(result.rows[0]);
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = { initialize, verify };