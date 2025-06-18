import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "../users/users.service";
import { CurrentRequestType } from "src/global.interface";

// NOTE: CurrentUserInterceptor converted to CurrentUserMiddleware.
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findOne(parseInt(userId));

      // Adding new user object to the request object
      if (user) {
        (req as CurrentRequestType).currentUser = user;
      }
    }

    next();
  }
}
