```SQL
CREATE TABLE smuni (
    smuni_id SERIAL PRIMARY KEY,
    payment_id INT,
    user_id INT,
    amount INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (payment_id) REFERENCES Payments(payment_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
```
