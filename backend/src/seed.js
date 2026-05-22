import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import defaultPerfumes from "./data/defaultPerfumes.js";
import Perfume from "./models/Perfume.js";

dotenv.config();

try {
  await connectDB();

  let inserted = 0;
  let skipped = 0;

  for (const perfume of defaultPerfumes) {
    const exists = await Perfume.exists({
      name: perfume.name,
      brand: perfume.brand,
    });

    if (exists) {
      skipped += 1;
    } else {
      await Perfume.create(perfume);
      inserted += 1;
    }
  }

  console.log(`Seed complete. Added ${inserted} perfumes. Skipped ${skipped} existing perfumes.`);

  process.exit(0);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
