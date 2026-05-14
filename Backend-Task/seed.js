const mongoose = require("mongoose");
const Order = require("./Models/order");

const connectDB = async () => {
  await mongoose.connect('mongodb+srv://tmohamedibahim1011_db_user:JQTFmDzp1xIej71e@cluster0.g05az4o.mongodb.net/?appName=Cluster0');
  console.log("MongoDB connected");
};

const orders = [
  {
    userId: new mongoose.Types.ObjectId(),
    items: [
      { productId: new mongoose.Types.ObjectId(), quantity: 2, price: 29.99 },
      { productId: new mongoose.Types.ObjectId(), quantity: 1, price: 49.99 },
    ],
    totalAmount: 109.97,
    status: "COD",
    createdAt: new Date("2025-01-15"),
  },
  {
    userId: new mongoose.Types.ObjectId(),
    items: [
      { productId: new mongoose.Types.ObjectId(), quantity: 3, price: 15.00 },
    ],
    totalAmount: 45.00,
    status: "Paid",
    createdAt: new Date("2025-02-10"),
  },
  {
    userId: new mongoose.Types.ObjectId(),
    items: [
      { productId: new mongoose.Types.ObjectId(), quantity: 1, price: 199.99 },
      { productId: new mongoose.Types.ObjectId(), quantity: 2, price: 9.99 },
    ],
    totalAmount: 219.97,
    status: "COD",
    createdAt: new Date("2025-03-05"),
  },
  {
    userId: new mongoose.Types.ObjectId(),
    items: [
      { productId: new mongoose.Types.ObjectId(), quantity: 5, price: 12.50 },
    ],
    totalAmount: 62.50,
    status: "Paid",
    createdAt: new Date("2025-04-20"),
  },
  {
    userId: new mongoose.Types.ObjectId(),
    items: [
      { productId: new mongoose.Types.ObjectId(), quantity: 2, price: 75.00 },
      { productId: new mongoose.Types.ObjectId(), quantity: 1, price: 150.00 },
    ],
    totalAmount: 300.00,
    status: "COD",
    createdAt: new Date("2025-05-12"),
  },
];

async function seed() {
  try {
    await connectDB();

    await Order.collection.dropIndexes();
    await Order.createIndexes();

    await Order.deleteMany({});
    await Order.insertMany(orders);

    console.log("Orders seeded successfully!");
    const indexes = await Order.collection.indexes();
    console.log("Indexes:", indexes.map(i => i.name));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();