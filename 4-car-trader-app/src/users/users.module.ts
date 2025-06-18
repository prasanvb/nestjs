import { MiddlewareConsumer, Module } from "@nestjs/common";
// import { APP_INTERCEPTOR } from "@nestjs/core";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
// import { CurrentUserInterceptor } from "./interceptor/current-user.interceptor";
import { CurrentUserMiddleware } from "../middleware/currentUserMiddleware";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    // NOTE: Code not in use. Globally scoped interceptor
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor,
    // },
  ],
  exports: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    // Middleware is applied to all the routes in the application
    consumer.apply(CurrentUserMiddleware).forRoutes("*");
  }
}
