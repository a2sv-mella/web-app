```SQL
CREATE TABLE Donations (
    donation_id SERIAL PRIMARY KEY,
    payment_id INT REFERENCES payments(payment_id),
    product_id INT REFERENCES products(product_id),
    amount DECIMAL(10, 2) NOT NULL,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_donations_updated_at
BEFORE UPDATE ON Donations
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
```