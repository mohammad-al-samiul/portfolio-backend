export interface IAuthor {
  name: string;
  profilePicture: string;
  bio: string;
  socialLinks: {
    twitter: string;
    github: string;
  };
}

export interface IComment {
  id: number;
  author: string;
  comment: string;
  date: string;
}

export interface IBlogPost {
  id: number;
  title: string;
  author: IAuthor;
  publishedDate: string;
  categories: string[];
  content: Array<
    | { type: string; text: string }
    | { type: "image"; src: string; alt: string }
    | { type: "quote"; text: string }
  >;
  tags: string[];
  comments: IComment[];
}
