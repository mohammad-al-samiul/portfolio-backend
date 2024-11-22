import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { ProjectServices } from "./project.service";

const createProject = catchAsync(async (req, res) => {
  const projectInfo = req.body;

  const result = await ProjectServices.createProjectIntoDB(
    req.file,
    projectInfo
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Project added successfully",
    data: result,
  });
});

/**
 * Controller to retrieve all projects.
 */
const getAllProjects = catchAsync(async (req, res) => {
  const result = await ProjectServices.getAllProjectsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Projects retrieved successfully",
    data: result,
  });
});
const getOneProject = catchAsync(async (req, res) => {
  const result = await ProjectServices.getOneProjectsFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Projects retrieved successfully",
    data: result,
  });
});

/**
 * Controller to update a project by ID.
 */
const updateProject = catchAsync(async (req, res) => {
  const updateDoc = req.body;
  const id = req.params.id;

  const result = await ProjectServices.updateProjectFromDB(updateDoc, id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project updated successfully",
    data: result,
  });
});

/**
 * Controller to delete a project by ID.
 */
const deleteProject = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ProjectServices.deleteProjectFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project deleted successfully",
    data: result,
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  getOneProject,
  updateProject,
  deleteProject,
};
