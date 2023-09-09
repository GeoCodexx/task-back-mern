import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    names: {
      type: String,
      required: true,
      trim: true,
    },
    patlastname: {
      type: String,
      required: true,
      trim: true,
    },
    matlastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
