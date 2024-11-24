import { Types } from "mongoose";

export interface IBlogPost {
  title: string;
  author?: Types.ObjectId; // Reference to User model
  content: string;
  publishedDate?: Date;
  categories: string[];
  tags: string[];
  comments?: IComment[];
}

export interface IComment {
  author: Types.ObjectId; // Reference to User model
  comment: string;
  date?: Date;
}
