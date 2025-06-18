import { Request } from "express";
import { User } from "./users/users.entity";

export interface CurrentRequestType extends Request {
  currentUser?: User | null;
  session?: {
    userId: string;
  };
}
