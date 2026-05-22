import express from "express";

import { auth } from "../middleware/auth.js";
import Perfume from "../models/Perfume.js";

const router = express.Router();

router.get("/", auth, async (req, res, next) => {
  try {
    await req.user.populate("wishlist");
    res.json(req.user.wishlist.filter(Boolean));
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { perfumeId } = req.body;
    const perfume = await Perfume.findById(perfumeId);

    if (!perfume) {
      return res.status(404).json({ message: "Perfume not found" });
    }

    const exists = req.user.wishlist.some((id) => id.equals(perfumeId));
    if (!exists) {
      req.user.wishlist.push(perfumeId);
      await req.user.save();
    }

    await req.user.populate("wishlist");
    res.status(201).json(req.user.wishlist.filter(Boolean));
  } catch (error) {
    next(error);
  }
});

router.delete("/:perfumeId", auth, async (req, res, next) => {
  try {
    req.user.wishlist = req.user.wishlist.filter((id) => !id.equals(req.params.perfumeId));
    await req.user.save();
    await req.user.populate("wishlist");
    res.json(req.user.wishlist.filter(Boolean));
  } catch (error) {
    next(error);
  }
});

export default router;
