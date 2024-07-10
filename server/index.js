const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

const authRouter = require("./routes/authRouter");
const campaignRouter = require("./routes/campaignRouter");
const paymentRouter = require("./routes/paymentRouter");
const userRouter = require("./routes/userRouter");

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/", (req, res) => {
  res.send("hello world");
});


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/campaigns", campaignRouter);
app.use("/api/v1/users",userRouter);


app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

const port = process.env.PORT || 8080;

try {
  app.listen(port, () => {
    console.log(`server running on port ${port} . . .`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
