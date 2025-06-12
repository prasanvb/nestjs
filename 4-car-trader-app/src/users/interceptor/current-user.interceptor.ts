import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";
import { CurrentRequestType } from "src/global.interface";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request: CurrentRequestType = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.usersService.findOne(parseInt(userId));
      // Adding new user object to the request object
      if (user) {
        request.currentUser = user;
      }
    }

    return next.handle();
  }
}
