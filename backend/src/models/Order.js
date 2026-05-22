import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    perfume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Perfume",
      required: true,
    },
    name: String,
    brand: String,
    image: String,
    price: Number,
    quantity: Number,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    customer: {
      fullname: String,
      address: String,
      city: String,
      pincode: String,
      phone: String,
      paymentMethod: String,
    },
    status: { type: String, default: "Confirmed" },
    deliveryDate: String,
  },
  { timestamps: true }
);

orderSchema.set("toJSON", {
  transform(_doc, ret) {
    ret.id = ret._id.toString();
    ret.date = new Date(ret.createdAt).toLocaleString("en-IN");
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Order", orderSchema);
