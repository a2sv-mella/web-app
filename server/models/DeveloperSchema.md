```SQL
CREATE TABLE developers (
    developer_id SERIAL PRIMARY KEY,
    user_id INT,
    company_name VARCHAR(255),
    website VARCHAR(255),
    description TEXT,
    rating DECIMAL(2, 1) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```