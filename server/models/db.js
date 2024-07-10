const pkg = require("pg");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const { Client } = pkg;
const db = new Client({
  connectionString: process.env.DATABASE_URL,
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

db.connect()
  .then(() => console.log("Connected to the PostgreSQL database"))
  .catch((err) => console.error("Connection error", err.stack));

module.exports =  db;
