import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { ViewUserDto } from "src/users/dto/view-user.dto";
import { Serialize } from "src/users/interceptor/serialize.intercept";

@Controller("auth")
export class authController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Post("signup")
  @Serialize(ViewUserDto)
  async userSignUp(@Body() body: CreateUserDto) {
    const { email, password } = body;

    // Check if the user email already if true throw error
    const userList = await this.usersService.findByEmail(email);

    if (userList.length) {
      throw new BadRequestException("Email already exits");
    }

    // Create a new user and return it
    const user = await this.authService.createNewUser(email, password);

    return user;
  }

  login() {}
}
