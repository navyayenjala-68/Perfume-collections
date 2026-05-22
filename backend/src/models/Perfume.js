import mongoose from "mongoose";

const perfumeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    mrp: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 4.4, min: 0, max: 5 },
    reviews: { type: Number, default: 0, min: 0 },
    category: { type: String, required: true, trim: true },
    concentration: { type: String, default: "EDP", trim: true },
    size: { type: String, default: "100 ml", trim: true },
    tag: { type: String, default: "New", trim: true },
    image: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    notes: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

perfumeSchema.set("toJSON", {
  transform(_doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Perfume", perfumeSchema);
