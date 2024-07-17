const { StatusCodes } = require("http-status-codes");
const db = require("../models/db");

const getProduct = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const developerQuery =
      "SELECT developer_id FROM developers WHERE user_id = $1";
    const developerResult = await db.query(developerQuery, [user_id]);
    const developer_id = developerResult.rows[0].developer_id;

    const productQuery = "SELECT * FROM products WHERE developer_id = $1";
    const productResult = await db.query(productQuery, [developer_id]);
    const productData = productResult.rows[0];

    let product = {};
    if (productData) {
      product = productData;
    }

    res.status(StatusCodes.OK).json({ product });
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    //TODO : Implement updating product's details.
    const { user_id, role } = req.user;
    const userQuery = "SELECT * FROM developers WHERE user_id = $1";
    const result = await db.query(userQuery, [user_id]);

    const developer_id = result.rows[0].developer_id;
    const developerQuery = "SELECT * FROM products WHERE developer_id = $1";
    const productResult = await db.query(developerQuery, [developer_id]);

    const data = req.body;
    const name = data.name;
    const category = data.category;
    const link = data.link;
    const description = data.description;
    const location = data.location;
    const is_free = data.productType === "free";
    const is_crowdfunded = data.productType === "crowdfunded";
    const is_paid = data.productType === "paid";

    if (productResult.rows.length === 0) {
      // TODO : Create the product

      const createProductQuery = `
  INSERT INTO products (developer_id, name, category, link, description, location, is_free, is_crowdfunded, is_featured)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING product_id;
`;
      const productValues = [
        developer_id,
        name,
        category,
        link,
        description,
        location,
        is_free,
        is_crowdfunded,
        is_paid,
      ];
      const product = await db.query(createProductQuery, productValues);

      res.status(StatusCodes.CREATED).json({ msg: "Product Created" });
    } else {
      const updateProductQuery = `UPDATE products SET name = $1, category = $2, link = $3, description = $4, location = $5, is_free = $6, is_crowdfunded = $7, is_featured = $8 WHERE developer_id = $9 RETURNING product_id;`;
      const productEditValues = [
        name,
        category,
        link,
        description,
        location,
        is_free,
        is_crowdfunded,
        is_paid,
        developer_id,
      ];
      const product = await db.query(updateProductQuery, productEditValues);

      res.status(StatusCodes.CREATED).json({ msg: "Product Updated" });
    }
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = { updateProduct, getProduct };
