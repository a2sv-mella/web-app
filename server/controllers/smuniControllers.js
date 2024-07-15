const { StatusCodes } = require("http-status-codes");
// const axios = require("axios");
require("dotenv").config();
const request = require("request");
const { promisify } = require("util");
const db = require("../models/db.js");

const requestPromise = promisify(request);
const buySmuni = async (req, res) => {
  try {
    const {price} = req.body;
    const user_id = req.user["user_id"]
    const random = Math.floor(Math.random() * 10000);
    const currentTime = new Date().getTime();
    const tx_ref = `melatest-${random}-${currentTime}`;
    
    const query = "SELECT first_name,last_name,email,phone_number FROM users WHERE user_id = $1"
    const result = await db.query(query,[user_id])

    const {first_name, last_name, email, phone_number} = result.rows[0]
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
        description: `to buy ${
          price * 4
        } Smunis from Mella.`,
      },
    };

    req.body.callback_url = process.env.MELLA_CALLBACK;
    authQuery = "SELECT private_key FROM developers WHERE developer_id = $1"
    const authResult = await db.query(authQuery, [data.developer_id])
    const private_key = authResult.rows[0].private_key
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
    const body = req.body;
    res.status(StatusCodes.OK).json({ msg: "Payment Successfull" });
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

  const data = {
    semuni_payment_id: smuni_payment_id,
    product_id: product_id,
    product_name: "Tef Tef",
    amount: 400,
    description: "Service Payment for Netflix and Chill",
  };
  res.status(StatusCodes.OK).json(data);
};

module.exports = { buySmuni, payWithSmuni, getSmuniPaymentData ,initializeWithSmuni};
