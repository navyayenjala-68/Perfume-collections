import express from "express";

import { auth } from "../middleware/auth.js";
import Order from "../models/Order.js";

const router = express.Router();

router.get("/", auth, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { customer, deliveryDate } = req.body;

    await req.user.populate({
      path: "cart.perfume",
      model: "Perfume",
    });

    const items = req.user.cart
      .filter((item) => item.perfume)
      .map((item) => ({
        perfume: item.perfume._id,
        name: item.perfume.name,
        brand: item.perfume.brand,
        image: item.perfume.image,
        price: item.perfume.price,
        quantity: item.quantity,
      }));

    if (items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await Order.create({
      user: req.user._id,
      items,
      total,
      customer,
      deliveryDate,
      status: "Confirmed",
    });

    req.user.cart = [];
    await req.user.save();

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

export default router;
