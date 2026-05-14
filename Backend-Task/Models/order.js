const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", index: true },
            quantity: Number,
            price: Number,
        },
    ],
    totalAmount: Number,
    status: { type: String, default: "COD", index: true },
    createdAt: { type: Date, default: Date.now, index: true },
});

module.exports = mongoose.model("Order", orderSchema);