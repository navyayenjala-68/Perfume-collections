import express from "express";

import Perfume from "../models/Perfume.js";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const perfumes = await Perfume.find().sort({ createdAt: -1 });
    res.json(perfumes);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const perfume = await Perfume.findById(req.params.id);

    if (!perfume) {
      return res.status(404).json({ message: "Perfume not found" });
    }

    res.json(perfume);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const perfume = await Perfume.create(req.body);
    res.status(201).json(perfume);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const perfume = await Perfume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!perfume) {
      return res.status(404).json({ message: "Perfume not found" });
    }

    res.json(perfume);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const perfume = await Perfume.findByIdAndDelete(req.params.id);

    if (!perfume) {
      return res.status(404).json({ message: "Perfume not found" });
    }

    res.json({ message: "Perfume deleted" });
  } catch (error) {
    next(error);
  }
});

export default router;
