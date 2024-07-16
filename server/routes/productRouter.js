const { Router } = require("express");
const {
  updateProduct,
  getProduct,
} = require("../controllers/productController");
const productRouter = Router();

productRouter.post("/edit", updateProduct);
productRouter.get("/get-product", getProduct);

module.exports = productRouter;
