const { StatusCodes } = require("http-status-codes");
const db = require("../models/db");
// const axios = require("axios");
require("dotenv").config();
const request = require("request");
const { promisify } = require("util");

const requestPromise = promisify(request);
const buySmuni = async (req, res) => {
  try {
    const { price } = req.body;
    const user_id = req.user["user_id"];
    const random = Math.floor(Math.random() * 10000);
    const currentTime = new Date().getTime();
    const tx_ref = `melatest-${random}-${currentTime}`;

    const query =
      "SELECT first_name,last_name,email,phone_number FROM users WHERE user_id = $1";
    const result = await db.query(query, [user_id]);

    const { first_name, last_name, email, phone_number } = result.rows[0];

    const data = {
      amount: price,
      currency: "ETB",
      user_id: user_id,
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone_number: "0913405421",
      product_id: 1,
      developer_id: 1,
      payment_type: "smuni",
      tx_ref: tx_ref,
      customization: {
        title: "Smuni Payment",
        description: `to buy ${price * 4} Smunis from Mella.`,
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

    res.send(jsonResponse);
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
const payWithSmuni = async (req, res) => {
  try {
    // TODO: Implement pay with smuni
    const body = req.body;

    const { smuni_payment_id, product_id, user_id, amount } = body;

    const smuniUpdateQuery = `UPDATE smuni_payments SET status = $1 ,user_id = $2 WHERE smuni_payment_id = $3 RETURNING *`;
    const queryResult = await db.query(smuniUpdateQuery, [
      true,
      user_id,
      smuni_payment_id,
    ]);

    const userUpdateQuery = `UPDATE users SET  smuni = smuni - $1  WHERE user_id = $2`;
    const userQueryResult = await db.query(userUpdateQuery, [amount, user_id]);

    console.log(userQueryResult.rows);
    res.status(StatusCodes.OK).json({ msg: "Payment Successfull" });
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
const initializeWithSmuni = async (req, res) => {
  try {
    // TODO : Validation on the req.body
    const key = req.headers.authorization;
    const product_id = req.body.product_id;

    const developerQuery =
      "SELECT developer_id,name FROM products WHERE product_id = $1";
    const developerResult = await db.query(developerQuery, [product_id]);
    const developer_id = developerResult.rows[0].developer_id;
    const product_name = developerResult.rows[0].name;

    const keyQuery =
      "SELECT private_key, public_key FROM developers WHERE developer_id = $1";
    const keyResult = await db.query(keyQuery, [developer_id]);

    const private_key = keyResult.rows[0].private_key;
    const public_key = keyResult.rows[0].public_key;

    if (key !== private_key && key !== public_key) {
      res.status(StatusCodes.FORBIDDEN).json({ error: "Invalid Credentials" });
      return;
    }
    const smuniPaymentForProduct = `SELECT * FROM smuni_payments WHERE product_id = $1`;
    const qResult = await db.query(smuniPaymentForProduct, [product_id]);
    const nextPayment = qResult.rowCount + 1;
    const checkout_url = `${process.env.CLIENT_URL}dashboard/smuni-payment/${product_id}-${nextPayment}`;
    const { amount, callback_url, return_url, customization } = req.body;
    const { description } = customization;

    const smuniPaymentInsertQuery = `
      INSERT INTO smuni_payments (product_id,amount,description, callback_url, return_url,checkout_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const smuniPaymentData = [
      product_id,
      amount,
      description,
      callback_url,
      return_url,
      checkout_url,
    ];

    const result = await db.query(smuniPaymentInsertQuery, smuniPaymentData);
    const paymentInfo = result.rows[0];

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Hosted Link", data: { checkout_url: checkout_url } });
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
const getSmuniPaymentData = async (req, res) => {
  const parts = req.params.id.split("-");
  const product_id = parts[0];
  const smuni_payment_id = parts[1];
  const checkout_url = `${process.env.CLIENT_URL}dashboard/smuni-payment/${product_id}-${smuni_payment_id}`;

  const smuniPaymentDataQuery = `SELECT * FROM smuni_payments WHERE checkout_url = $1`;
  const productDataQuery = `SELECT name FROM products WHERE product_id = $1`;
  const smuniPaymentQueryData = await db.query(smuniPaymentDataQuery, [
    checkout_url,
  ]);
  const productQueryData = await db.query(productDataQuery, [product_id]);

  const productData = productQueryData.rows[0];
  const smuniPaymentData = smuniPaymentQueryData.rows[0];

  const { amount, description } = smuniPaymentData;
  const { name } = productData;

  const data = {
    smuni_payment_id: smuniPaymentData.smuni_payment_id,
    product_id: product_id,
    product_name: name,
    amount: amount,
    description: description,
  };
  res.status(StatusCodes.OK).json(data);
};

module.exports = {
  buySmuni,
  payWithSmuni,
  getSmuniPaymentData,
  initializeWithSmuni,
};
