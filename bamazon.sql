CREATE DATABASE bamazon;
use bamazon;
CREATE TABLE products (
    item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("iPhone", "Electronics", 999, 25),
("Macbook", "Electronics", 1800, 10),
("Apple Watch", "Electronics", 400, 20),
("Air Pods", "Electronics", 100, 35),
("Grand Piano", "Music", 20000, 5),
("Guitar", "Music", 500, 14),
("Saxophone", "Music", 750, 8),
("Trumpet", "Music", 600, 11),
("Jeans", "Clothing", 60, 60),
("T-Shirt", "Clothing", 40, 100),
("Sweatshirt", "Clothing", 50, 80);

SELECT * FROM products