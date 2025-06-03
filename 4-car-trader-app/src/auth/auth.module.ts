import { Module } from "@nestjs/common";
import { authController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [],
  controllers: [authController],
  providers: [AuthService],
})
export class AuthModule {}
