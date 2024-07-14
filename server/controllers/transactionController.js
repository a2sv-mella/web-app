const { StatusCodes } = require("http-status-codes");
const db = require("../models/db");

const getTransactions = async (req, res) => {
  try {
    
    const user_id = req.user.user_id;
    const developerQuery = "SELECT developer_id FROM developers WHERE user_id = $1";
    const developerResult = await db.query(developerQuery, [user_id]);
    const developer_id = developerResult.rows[0].developer_id

    const query = "SELECT product_id FROM products WHERE developer_id = $1";
    const result = await db.query(query, [developer_id]);

    if (result.rows.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Payment not found" });
    }

    let transactions = result.rows[0];
    const product_id = transactions.product_id
    const productQuery = "SELECT * FROM payments WHERE product_id = $1 AND status = true"
    const paymentResult = await db.query(productQuery, [product_id])
    const paymentss = paymentResult.rows


    console.log(paymentss)
    res.status(StatusCodes.OK).json(paymentss);
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = getTransactions;
