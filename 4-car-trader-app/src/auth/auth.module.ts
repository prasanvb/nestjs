import { Module } from "@nestjs/common";
import { authController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [UsersModule],
  controllers: [authController],
  providers: [AuthService],
})
export class AuthModule {}
