```SQL
CREATE TABLE smuni_payments (
    semuni_payment_id SERIAL PRIMARY KEY,
    product_id INT,
    user_id INT NULL,
    amount INT,
    description TEXT,
    callback_url TEXT,
    checkout_url TEXT,
    return_url TEXT,
    status BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```
