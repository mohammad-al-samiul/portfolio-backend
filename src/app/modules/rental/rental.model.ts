import mongoose, { Schema } from "mongoose";
import { TRental } from "./rental.interface";

const rentalSchema = new Schema<TRental>({
  userId: {
    type: Schema.Types.ObjectId,
  },
  bikeId: {
    type: Schema.Types.ObjectId,
  },
  startTime: {
    type: String,
    required: true,
  },
  returnTime: {
    type: String,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  isReturned: {
    type: Boolean,
    required: true,
  },
});

export const Rental = mongoose.model<TRental>("Rental", rentalSchema);
