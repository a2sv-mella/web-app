require("express-async-errors");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { body, validationResult } = require("express-validator");

const authRouter = require("./routes/authRouter");
const campaignRouter = require("./routes/campaignRouter");
const paymentRouter = require("./routes/paymentRouter");
const userRouter = require("./routes/userRouter");
const transRouter = require("./routes/transactionRouter");
const productRouter = require("./routes/productRouter");
const smuniRouter = require("./routes/smuniRouter");
const sharesRouter = require("./routes/sharesRouter");

const {
  authenticateUser,
  errorHandlerMiddleware,
  authenticateDeveloper,
} = require("./middleware");

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

const corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
  credentials: true,
};

// console.log(process.env.DEPLOYMENT_URL);
// const corsOptions = {
//   origin: process.env.DEPLOYMENT_URL,
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
//   credentials: true,
// };

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use(express.static(path.join(__dirname, "build")));

// If a user is a developer doesn't it mean he is a user ?
// maybe we can you authenticateDeveloper only.
app.use(
  "/api/v1/transactions",
  authenticateUser,
  authenticateDeveloper,
  transRouter
);
app.use("/api/v1/shares", authenticateUser, sharesRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/smuni", authenticateUser, smuniRouter);
app.use("/api/v1/campaigns", authenticateUser, campaignRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use(
  "/api/v1/product",
  authenticateUser,
  authenticateDeveloper,
  productRouter
);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build/index.html"));
// });

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);
const port = process.env.PORT || 8080;

try {
  app.listen(port, () => {
    console.log(`server running on port ${port} . . .`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
