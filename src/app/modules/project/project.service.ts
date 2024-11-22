/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProject } from "./project.interface";
import { Project } from "./project.model";

const createProjectIntoDB = async (image: any, payload: IProject) => {
  const image_url = image?.path;

  payload.imageUrl = image_url;
  // console.log("payload", payload);

  const result = await Project.create(payload);
  return result;
};

const getAllProjectsFromDB = async () => {
  const result = await Project.find().select("-__v");
  return result;
};
const getOneProjectsFromDB = async (id: string) => {
  const result = await Project.findOne({ _id: id });
  return result;
};

const updateProjectFromDB = async (payload: Partial<IProject>, id: string) => {
  const result = await Project.findOneAndUpdate({ _id: id }, payload, {
    new: true, // Return the updated document
  }).select("-createdAt -updatedAt -__v");
  return result;
};

const deleteProjectFromDB = async (id: string) => {
  const result = await Project.findOneAndDelete(
    { _id: id },
    { lean: true } // Return a plain JavaScript object instead of a Mongoose document
  ).select("-createdAt -updatedAt -__v");
  return result;
};

export const ProjectServices = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getOneProjectsFromDB,
  updateProjectFromDB,
  deleteProjectFromDB,
};
