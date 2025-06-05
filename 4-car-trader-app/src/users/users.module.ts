import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { CurrentUserInterceptor } from "./interceptor/current-user.interceptor";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, CurrentUserInterceptor],
  exports: [UsersService, CurrentUserInterceptor],
})
export class UsersModule {}
