import mongoose, { Schema } from "mongoose";
import { TBike } from "./bike.interface";

const bikeSchema = new Schema<TBike>(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    pricePerHour: {
      type: Number,
    },
    isAvailable: {
      type: Boolean,
    },
    cc: {
      type: Number,
    },
    year: {
      type: Number,
    },
    model: {
      type: String,
    },
    brand: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Bike = mongoose.model<TBike>("Bike", bikeSchema);
