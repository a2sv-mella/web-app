const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

let db;

const ENVIRONMENT = process.env.NODE_ENV;

if (ENVIRONMENT === "production") {
  const PGHOST = process.env.PGHOST;
  const PGDATABASE = process.env.PGDATABASE;
  const PGUSER = process.env.PGUSER;
  const PGPASSWORD = process.env.PGPASSWORD;

  const { Pool } = require("pg");
  db = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: {
      require: true,
    },
  });
} else if (ENVIRONMENT === "development") {
  const { Client } = require("pg");
  db = new Client({
    connectionString: process.env.DATABASE_URL,
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
  });
}

db.connect()
  .then(() => console.log("Connected to the PostgreSQL database"))
  .catch((err) => console.error("Connection error", err.stack));

module.exports = db;
