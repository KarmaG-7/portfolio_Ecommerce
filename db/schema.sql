DROP DATABASE IF EXISTS commerce_dev;
CREATE DATABASE commerce_dev;

\c commerce_dev;

CREATE TABLE commerce(
    id SERIAL PRIMARY KEY,
    product_name TEXT NOT NULL,
    price DECIMAL (8,2) DEFAULT 0.00,
    rating INTEGER,
    product_image TEXT,
    category TEXT,
    is_popular BOOLEAN,   
    product_description TEXT
);
