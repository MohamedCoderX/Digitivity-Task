const express = require("express");
const router = express.Router();
const db = require('../db')

router.get("/", (req, res) => {
    const sql = `
        SELECT 
            o.id AS order_id,
            o.total_amount,
            o.payment_method,
            o.order_status,
            o.created_at,
            u.name AS user_name,
            u.email
        FROM orders o
        JOIN users u ON o.user_id = u.id
        ORDER BY o.created_at DESC
    `;

    db.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({
            success: true,
            count: rows.length,
            orders: rows
        });
    });
});
router.get("/:id", (req, res) => {
    const orderId = req.params.id;

    const sql = `
        SELECT 
            o.id AS order_id,
            o.total_amount,
            o.payment_method,
            o.order_status,
            o.created_at,

            u.name AS user_name,
            u.email,

            od.product_id,
            p.name AS product_name,
            od.quantity,
            od.price

        FROM orders o
        JOIN users u ON o.user_id = u.id
        JOIN order_details od ON o.id = od.order_id
        JOIN products p ON od.product_id = p.id
        WHERE o.id = ?
    `;

    db.query(sql, [orderId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.json({
            success: true,
            order: rows
        });
    });
});
module.exports = router;