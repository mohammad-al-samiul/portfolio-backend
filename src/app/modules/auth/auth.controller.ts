import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req, res) => {
  const { userData } = req.body;
  const result = await UserServices.createUserIntoDB(userData);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userDataFromDB } = result.toObject();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User is created successfully!",
    data: userDataFromDB,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const { userData } = req.body;
  const result = await UserServices.loginUserFromDB(userData);
  const { accessToken } = result;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully!",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  loginUser,
};
