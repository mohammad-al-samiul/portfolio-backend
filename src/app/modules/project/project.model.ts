import mongoose, { Schema } from "mongoose";
import { IProject } from "./project.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const projectSchema = new Schema<IProject>(
  {
    projectNo: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String], // Array of strings
      required: true,
    },
    features: {
      type: [String], // Array of strings
      required: true,
    },
    github: {
      type: String,
      required: true,
    },
    live: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt`
  }
);

// Middleware to check if a project with the same ID exists before saving
projectSchema.pre("save", async function (next) {
  const isProjectExist = await Project.findOne({ _id: this?._id });
  if (isProjectExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      "A project with this ID already exists!"
    );
  }
  next();
});

// Middleware to ensure a project exists before updating
projectSchema.pre("findOneAndUpdate", async function (next) {
  const query = this?.getQuery();
  const isProjectExist = await Project.findOne(query);
  if (!isProjectExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found!");
  }
  next();
});

// Middleware to ensure a project exists before deleting
projectSchema.pre("findOneAndDelete", async function (next) {
  const query = this?.getQuery();
  const isProjectExist = await Project.findOne(query);
  if (!isProjectExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found!");
  }
  next();
});

export const Project = mongoose.model<IProject>("Project", projectSchema);
