import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req, res) => {
  const { userData } = req.body;

  const result = await UserServices.createUserIntoDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is created successfully!",
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
