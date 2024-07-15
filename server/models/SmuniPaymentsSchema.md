```SQL
CREATE TABLE Semuni (
    semuni_payment_id SERIAL PRIMARY KEY,
    product_id INT,
    user_id INT,
    amount INT,
    description TEXT,
    status BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```
