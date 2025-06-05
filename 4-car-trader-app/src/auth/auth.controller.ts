import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Session } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { UserDto } from "src/users/dto/create-user.dto";
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
  async userSignUp(@Body() body: UserDto, @Session() session: any) {
    const { email, password } = body;

    // Check if the user email already exists
    const userList = await this.usersService.findByEmail(email);

    if (userList.length) {
      throw new BadRequestException("Email already exits");
    }

    // Create a new user and return it
    const user = await this.authService.createNewUser(email, password);

    // Create a session with user id
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    session.userId = user.id;

    return user;
  }

  @Post("login")
  @Serialize(ViewUserDto)
  async login(@Body() body: UserDto, @Session() session) {
    const { email, password } = body;

    // Check if the user email already exists
    const [user] = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException("Email does not exits");
    }

    const authenticatedUser = await this.authService.authenticateUser(user, password);

    // Create a session with user id
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    session.userId = authenticatedUser.id;

    return authenticatedUser;
  }

  @Get("identify-session")
  @Serialize(ViewUserDto)
  async identifyUser(@Session() session: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const user = await this.usersService.findOne(parseInt(session.userId));
    if (!user) {
      throw new NotFoundException(`No session user found`);
    }
    return user;
  }

  // NOTE: Example route set encrypted session cookie
  @Get("/colors/:color")
  setColor(@Param("color") color: string, @Session() session) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    session.color = color;
  }

  // NOTE: Example route get decrypted session data
  @Get("/colors")
  getColors(@Session() session) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return { color: session.color as string };
  }
}
