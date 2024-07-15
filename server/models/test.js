const db = require("./db");
const query = `CREATE TABLE campaigns (
    campaign_id SERIAL PRIMARY KEY,
    product_id INT,
    goal_amount DECIMAL(10, 2),
    price_per_share DECIMAL(10, 2),
    current_amount DECIMAL(10, 2) DEFAULT 0,
    end_date DATE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);`;

db.query(query).then((res) => {
  console.log(res);
  console.log("Table is successfully created");
  db.end();
});
