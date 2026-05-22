import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    perfume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Perfume",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    cart: [cartItemSchema],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Perfume",
      },
    ],
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform(_doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});

export default mongoose.model("User", userSchema);
