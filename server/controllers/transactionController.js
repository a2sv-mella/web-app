const { StatusCodes } = require("http-status-codes");
const db = require("../models/db");

const getTransactions = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const developerQuery =
      "SELECT developer_id FROM developers WHERE user_id = $1";
    const developerResult = await db.query(developerQuery, [user_id]);
    const developer_id = developerResult.rows[0].developer_id;
    const query = "SELECT product_id FROM products WHERE developer_id = $1";
    const result = await db.query(query, [developer_id]);
    if (result.rows.length === 0) {
      return res.status(StatusCodes.OK).json([]);
    }

    let transactions = result.rows[0];
    const product_id = transactions.product_id;

    const productQuery =
      "SELECT * FROM payments WHERE product_id = $1 AND status = true";
    const paymentResult = await db.query(productQuery, [product_id]);
    const paymentss = paymentResult.rows;

    const smuniQuery =
      "SELECT user_id,amount,smuni_payment_id from smuni_payments WHERE product_id = $1 AND status = $2";
    const smuniResult = await db.query(smuniQuery, [product_id, true]);
    const smuniPayments = smuniResult.rows;

    await Promise.all(
      smuniPayments.map(async (element) => {
        const payer_id = element.user_id;
        const amount = element.amount;
        const smuniPaymentID = element.smuni_payment_id;

        const payerQuery = "SELECT * from users WHERE user_id = $1";
        const payerResult = await db.query(payerQuery, [payer_id]);
        const payerInfo = payerResult.rows[0];
        const smuniTransaction = {
          status: true,
          email: payerInfo.email,
          amount: parseInt(amount / 4, 10),
          currency: "Smuni",
          product_id: product_id,
          tx_ref: `tx_ref-${smuniPaymentID}-${product_id}`,
          payment_type: "Smuni",
        };
        paymentss.push(smuniTransaction);
      })
    );
    res.status(StatusCodes.OK).json(paymentss);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = getTransactions;
