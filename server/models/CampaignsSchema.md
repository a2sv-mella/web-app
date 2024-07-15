
```sql
CREATE TABLE campaigns (
    campaign_id SERIAL PRIMARY KEY,
    product_id INT,
    goal_amount DECIMAL(10, 2),
    price_per_share DECIMAL(10, 2),
    current_amount DECIMAL(10, 2) DEFAULT 0,
    end_date DATE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);
```