```SQL
CREATE TABLE developers (
    developer_id SERIAL PRIMARY KEY,
    user_id INT,
    private_key VARCHAR(255),
    public_key VARCHAR(255),
    encryption_key VARCHAR(255),
    rating DECIMAL(2, 1) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```
