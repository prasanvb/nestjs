import { UsersService } from "./users.service";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("user")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("auth/signup")
  createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;

    return this.usersService.create(email, password);
  }
}
