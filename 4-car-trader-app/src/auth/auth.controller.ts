import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Session,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { UserDto } from "../users/dto/create-user.dto";
import { ViewUserDto } from "../users/dto/view-user.dto";
import { Serialize } from "../users/interceptor/serialize.interceptor";
import { CurrentUser } from "../users/decorator/current-user.decorator";
import { User } from "../users/users.entity";
import { AuthGuard } from "../guards/index";

@Controller("auth")
export class authController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Post("signup")
  @Serialize(ViewUserDto) // Transforms the contents of the route api response object before sending out
  async userSignUp(@Body() body: UserDto, @Session() session: CookieSessionInterfaces.CookieSessionObject) {
    const { email, password } = body;

    // Check if the user email already exists
    const userList = await this.usersService.findByEmail(email);

    if (userList.length) {
      throw new BadRequestException("Email already exits");
    }

    // Create a new user and return it
    const user = await this.authService.createNewUser(email, password);

    // Create a session with user id
    session.userId = user.id;

    return user;
  }

  @Post("login")
  @Serialize(ViewUserDto) // Transforms the contents of the route api response object before sending out
  async login(@Body() body: UserDto, @Session() session: CookieSessionInterfaces.CookieSessionObject) {
    const { email, password } = body;

    // Check if the user email already exists
    const [user] = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException("Email does not exits");
    }

    const authenticatedUser = await this.authService.authenticateUser(user, password);

    // Create a session with user id
    session.userId = authenticatedUser.id;

    return authenticatedUser;
  }

  @Post("/logout")
  logout(@Session() Session: CookieSessionInterfaces.CookieSessionObject) {
    Session.userId = null;
    return { sessionUserID: Session.userId as null };
  }

  // NOTE: Identify currently logged in user using Session param decorator
  @Get("identify-session")
  @Serialize(ViewUserDto)
  async identifyUser(@Session() session: CookieSessionInterfaces.CookieSessionObject) {
    const id = parseInt(session.userId as string);
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`No session user found`);
    }
    return user;
  }

  // NOTE: Identify currently logged in user using custom CurrentUser decorator
  @Get("whoami")
  @UseGuards(AuthGuard)
  @Serialize(ViewUserDto)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  // NOTE: Example routes for session cookie feature
  // Set encrypted session cookie
  @Get("/colors/:color")
  setColor(@Param("color") color: string, @Session() session) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    session.color = color;
  }

  // Get decrypted session data
  @Get("/colors")
  getColors(@Session() session) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return { color: session.color as string };
  }
}
