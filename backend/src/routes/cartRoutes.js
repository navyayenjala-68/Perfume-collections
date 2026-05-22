import express from "express";

import { auth } from "../middleware/auth.js";
import Perfume from "../models/Perfume.js";

const router = express.Router();

const cartPopulate = {
  path: "cart.perfume",
  model: "Perfume",
};

function formatCart(user) {
  return user.cart
    .filter((item) => item.perfume)
    .map((item) => ({
      ...item.perfume.toJSON(),
      quantity: item.quantity,
    }));
}

router.get("/", auth, async (req, res, next) => {
  try {
    await req.user.populate(cartPopulate);
    res.json(formatCart(req.user));
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { perfumeId, quantity = 1 } = req.body;
    const perfume = await Perfume.findById(perfumeId);

    if (!perfume) {
      return res.status(404).json({ message: "Perfume not found" });
    }

    const item = req.user.cart.find((cartItem) => cartItem.perfume.equals(perfumeId));

    if (item) {
      item.quantity += Number(quantity);
    } else {
      req.user.cart.push({ perfume: perfumeId, quantity: Number(quantity) });
    }

    await req.user.save();
    await req.user.populate(cartPopulate);
    res.status(201).json(formatCart(req.user));
  } catch (error) {
    next(error);
  }
});

router.patch("/:perfumeId", auth, async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const item = req.user.cart.find((cartItem) => cartItem.perfume.equals(req.params.perfumeId));

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    item.quantity = Number(quantity);
    req.user.cart = req.user.cart.filter((cartItem) => cartItem.quantity > 0);

    await req.user.save();
    await req.user.populate(cartPopulate);
    res.json(formatCart(req.user));
  } catch (error) {
    next(error);
  }
});

router.delete("/:perfumeId", auth, async (req, res, next) => {
  try {
    req.user.cart = req.user.cart.filter(
      (cartItem) => !cartItem.perfume.equals(req.params.perfumeId)
    );

    await req.user.save();
    await req.user.populate(cartPopulate);
    res.json(formatCart(req.user));
  } catch (error) {
    next(error);
  }
});

router.delete("/", auth, async (req, res, next) => {
  try {
    req.user.cart = [];
    await req.user.save();
    res.json([]);
  } catch (error) {
    next(error);
  }
});

export default router;
