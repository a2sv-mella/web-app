const { Router } = require("express");
const { updateProduct } = require("../controllers/productController");
const productRouter = Router();

productRouter.post("/edit", updateProduct);

module.exports = productRouter;
