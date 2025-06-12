import { User } from "./users/users.entity";
import { RequestHandler } from "@nestjs/common/interfaces";

export interface CurrentRequestType extends RequestHandler {
  currentUser?: User | null;
  session?: {
    userId: string;
  };
}
