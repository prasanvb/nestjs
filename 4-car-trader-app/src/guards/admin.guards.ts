import { CanActivate, ExecutionContext } from "@nestjs/common";
import { CurrentRequestType } from "src/global.interface";

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: CurrentRequestType = context.switchToHttp().getRequest();

    console.log("AdminGuard ", request.currentUser);
    if (!request.currentUser) {
      return false;
    }

    return request.currentUser.admin;
  }
}
