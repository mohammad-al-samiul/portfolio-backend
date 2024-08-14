import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RentalServices } from "./rental.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createRental = catchAsync(async (req, res) => {
  const token = req.headers.authorization as string;
  const rentalInfo = req.body;
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;

  const result = await RentalServices.createRentalIntoDB(rentalInfo, decoded);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental created successfully!",
    data: result,
  });
});

export const RentalControllers = {
  createRental,
};
