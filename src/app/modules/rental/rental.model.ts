import mongoose, { Schema } from "mongoose";
import { TRental } from "./rental.interface";
import { Bike } from "../bikes/bike.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../auth/auth.model";

const rentalSchema = new Schema<TRental>({
  userId: {
    type: Schema.Types.ObjectId,
  },
  bikeId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  returnTime: {
    type: String,
    default: null,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
});

rentalSchema.pre("save", async function () {
  const isBikeExist = await Bike.findOne({ _id: this.bikeId });
  if (!isBikeExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Bike not found!");
  }

  if (!isBikeExist.isAvailable) {
    throw new AppError(
      httpStatus.SERVICE_UNAVAILABLE,
      "Bike is not available!"
    );
  }

  const isUserExist = await User.findOne({ _id: this.userId });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not found!");
  }
});

export const Rental = mongoose.model<TRental>("Rental", rentalSchema);
