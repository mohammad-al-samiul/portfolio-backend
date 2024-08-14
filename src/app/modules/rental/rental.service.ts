import { JwtPayload } from "jsonwebtoken";
import { TRental } from "./rental.interface";
import mongoose from "mongoose";
import { User } from "../auth/auth.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Rental } from "./rental.model";
import { Bike } from "../bikes/bike.model";

const createRentalIntoDB = async (payload: TRental, decodInfo: JwtPayload) => {
  const { email, role } = decodInfo;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const user = await User.findOne({ email, role });
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User is not authorized");
    }

    const userId = user._id;
    payload.userId = userId;

    const result = await Rental.create([payload], { session });

    await Bike.findOne(
      { _id: payload.bikeId },
      { isAvailable: false },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
  }
};

export const RentalServices = {
  createRentalIntoDB,
};
