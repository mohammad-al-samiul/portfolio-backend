import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { bikeServices } from "./bike.service";

const createBike = catchAsync(async (req, res) => {
  const bikeInfo = req.body;
  const result = await bikeServices.createBikeIntoDB(bikeInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bike added successfully",
    data: result,
  });
});

export const bikeController = {
  createBike,
};
