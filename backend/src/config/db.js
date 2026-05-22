import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing. Add it to backend/.env");
  }

  try {
    const host = uri.includes("@")
      ? uri.split("@").at(-1).split("/")[0]
      : uri.replace("mongodb://", "").replace("mongodb+srv://", "").split("/")[0];

    console.log(`Connecting to MongoDB at ${host}...`);

    await mongoose.connect(uri, {
      connectTimeoutMS: 5000,
      socketTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    if (error.message?.includes("ECONNREFUSED")) {
      throw new Error(
        [
          "MongoDB is not running at 127.0.0.1:27017.",
          "Start MongoDB locally, or replace MONGODB_URI in backend/.env with a MongoDB Atlas URI.",
          "After MongoDB is available, run: npm.cmd run seed",
        ].join(" ")
      );
    }

    throw error;
  }
}
