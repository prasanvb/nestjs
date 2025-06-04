import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { ViewUserDto } from "src/users/dto/view-user.dto";
import { Serialize } from "src/users/interceptor/serialize.intercept";

const scrypt = promisify(_scrypt);

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
    const user = await this.usersService.findByEmail(email);

    if (user.length) {
      throw new BadRequestException("Email already exits");
    }

    // Hashing new user password
    // Generate a salt
    const salt = randomBytes(8);

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer<ArrayBufferLike>;

    // Join the hashed result and the salt together
    const hashedPassword = salt.toString("hex") + "." + hash.toString("hex");

    // Create new user and save it
    const newlyCreatedUser = await this.usersService.create(email, hashedPassword);

    // return newly created user
    return newlyCreatedUser;
  }

  login() {}
}
