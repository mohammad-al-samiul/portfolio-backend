import mongoose, { Schema } from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    image: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//hash password
userSchema.pre("save", async function (next) {
  const isUserExist = await User.findOne({ email: this.email });
  if (isUserExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      "A user is already exist by this email"
    );
  }
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = mongoose.model("User", userSchema);
