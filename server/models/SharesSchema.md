```SQL
CREATE TABLE shares (
    share_id SERIAL PRIMARY KEY,
    payment_id INT,
    user_id INT,
    product_id INT,
    campaign_id INT,
    amount_of_share INT,
    tx_ref TEXT,
    status BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (payment_id) REFERENCES payments(payment_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```
