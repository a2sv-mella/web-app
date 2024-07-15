const { StatusCodes } = require("http-status-codes");
// const axios = require("axios");
const buySmuni = async (req, res) => {
  try {
    // TODO: Implement buy smuni
    const { price } = req.body;
    const random = Math.floor(Math.random() * 10000);
    const currentTime = new Date().getTime();
    const tx_ref = `melatest-${random}-${currentTime}`;

    console.log(tx_ref, price);
    const data = {
      amount: price,
      currency: "ETB",
      email: "mella@gmail.com",
      first_name: "Mella",
      last_name: "StartUp",
      phone_number: "0912345678",
      payment_type: "smuni",
      tx_ref: tx_ref,
      sender_callback: "http://127.0.0.1:8050",
      return_url: "http://127.0.0.1:5173/dashboard/",
      customization: {
        title: "Payment for Smuni",
        description: `This payment is being made to by ${
          price * 4
        } Smunis from Mella.`,
      },
    };

    console.log(price);
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
    console.log(body);
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
    // TODO: Implement pay with smuni
    const body = req.body;
    console.log(body); 
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
