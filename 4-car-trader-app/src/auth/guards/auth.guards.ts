import { CanActivate, ExecutionContext } from "@nestjs/common";
import { CurrentRequestType } from "src/global.interface";

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: CurrentRequestType = context.switchToHttp().getRequest();

    if (!request.session) {
      return false;
    }

    return !!request.session.userId;
  }
}
