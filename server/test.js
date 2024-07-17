require("express-async-errors");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    console.log(req.body)
    res.send("hello world")
})

try {
  app.listen(8050, () => {
    console.log(`server running on port ${8050} . . .`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
