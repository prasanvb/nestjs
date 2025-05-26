import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("user")
export class UsersController {
  @Post("auth/signup")
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
  }
}
