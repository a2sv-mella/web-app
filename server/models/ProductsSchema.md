```SQL
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    developer_id INT,
    name VARCHAR(255),
    description TEXT,
    category VARCHAR(255),
    price DECIMAL(10, 2) DEFAULT 0,
    is_free BOOLEAN DEFAULT FALSE,
    is_crowdfunded BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (developer_id) REFERENCES developers(developer_id)
);

CREATE OR REPLACE FUNCTION update_product_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_product_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE PROCEDURE update_product_timestamp();

```
