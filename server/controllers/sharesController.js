const { StatusCodes } = require("http-status-codes");
const db = require("../models/db");

const getShares = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const sharesQuery =
      "SELECT * FROM shares WHERE user_id = $1 AND status = true";
    const sharesResult = await db.query(sharesQuery, [user_id]);
    const sharesData = sharesResult.rows;

    if (sharesData.length === 0) {
      return res.status(StatusCodes.OK).json([]);
    }
    const payments = [];

    await Promise.all(
      sharesData.map(async (element) => {
        const tx_ref = element.tx_ref;
        const product_id = element.product_id;
        const amount_of_share = element.amount_of_share;

        const paymentQuery = "SELECT amount from payments WHERE tx_ref = $1";
        const paymentResult = await db.query(paymentQuery, [tx_ref]);
        const paymentData = paymentResult.rows[0];

        const totalPrice = paymentData.amount;
        const currency = "ETB";

        const fundsTransaction = {
          product_id: product_id,
          price: totalPrice,
          totalShare: amount_of_share,
          tx_ref: tx_ref,
          currency: "ETB",
          status: true,
        };
        payments.push(fundsTransaction);
      })
    );
    res.status(StatusCodes.OK).json(payments);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = { getShares };
