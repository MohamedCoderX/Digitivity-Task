USE ecommerce_db;

INSERT INTO users (
    name,
    email,
    password
)
VALUES
(
    'Mohamed Ibrahim',
    'mohamed@gmail.com',
    '123456'
);

INSERT INTO products (
    name,
    description,
    price,
    stock,
    category
)
VALUES
(
    'iPhone 15',
    'Apple smartphone',
    79999,
    10,
    'Mobiles'
),
(
    'Nike Shoes',
    'Running shoes',
    4999,
    20,
    'Footwear'
);


INSERT INTO orders (
    user_id,
    total_amount,
    payment_method,
    order_status
)
VALUES
(
    1,
    84998,
    'Cash on Delivery',
    'Pending'
);


INSERT INTO order_details (
    order_id,
    product_id,
    quantity,
    price
)
VALUES
(
    1,
    1,
    1,
    79999
),
(
    1,
    2,
    1,
    4999
);