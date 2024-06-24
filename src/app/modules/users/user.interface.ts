export type TUser = {
  name: string;
  email: string;
  password: string;
  phone?: number; //optional phone number
  address?: string; //optional address
  role: "admin" | "user";
};
