import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { BikeServices } from "./bike.service";

const createBike = catchAsync(async (req, res) => {
  const bikeInfo = req.body;
  const result = await BikeServices.createBikeIntoDB(bikeInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Bike added successfully",
    data: result,
  });
});

const getAllBike = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikeFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bikes retrieved successfully",
    data: result,
  });
});

const updateBike = catchAsync(async (req, res) => {
  const updateDoc = req.body;
  const id = req.params.id;

  const result = await BikeServices.updateBikeFromDB(updateDoc, id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bike updated successfully",
    data: result,
  });
});

export const BikeController = {
  createBike,
  getAllBike,
  updateBike,
};