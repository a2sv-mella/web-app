
const dotenv = require("dotenv"); 
const express = require("express")
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});
const port = process.env.PORT || 8080;

try {
  app.listen(port, () => {
    console.log(`server running on port ${port}. . .`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
