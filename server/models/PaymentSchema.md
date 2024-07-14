```SQL

CREATE TYPE payment_types AS ENUM ('smuni', 'payment', 'donation', 'crowdFund');

CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    payment_type payment_types DEFAULT 'payment',
    tx_ref TEXT,
    currency TEXT,
    product_id INT,
    amount DECIMAL(10, 2),
    email TEXT DEFAULT NULL,
    first_name TEXT DEFAULT NULL,
    last_name TEXT DEFAULT NULL,
    phone_number TEXT DEFAULT NULL,
    callback_url TEXT DEFAULT NULL,
    return_url TEXT DEFAULT NULL,
    description TEXT DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status BOOLEAN DEFAULT false,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```
