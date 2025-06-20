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
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  // Handles user signup by validating email uniqueness and creating a session.
  @Post("signup")
  @Serialize(ViewUserDto) // Transforms the contents of the route API response object before sending out
  async userSignUp(@Body() body: UserDto, @Session() session: CookieSessionInterfaces.CookieSessionObject) {
    const { email, password } = body;

    // Check if the user email already exists
    const userList = await this.usersService.findByEmail(email);

    if (userList.length) {
      throw new BadRequestException("Email already exists");
    }

    // Create a new user and return it
    const user = await this.authService.createNewUser(email, password);

    // Create a session with user id
    session.userId = user.id;

    return user;
  }

  // Handles user login by validating credentials and creating a session.
  @Post("login")
  @Serialize(ViewUserDto) // Transforms the contents of the route API response object before sending out
  async login(@Body() body: UserDto, @Session() session: CookieSessionInterfaces.CookieSessionObject) {
    const { email, password } = body;

    // Check if the user email already exists
    const [user] = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException("Email does not exist");
    }

    const authenticatedUser = await this.authService.authenticateUser(user, password);

    // Create a session with user id
    session.userId = authenticatedUser.id;

    return authenticatedUser;
  }

  // Logs out the user by clearing the session user ID.
  @Post("/logout")
  logout(@Session() Session: CookieSessionInterfaces.CookieSessionObject) {
    Session.userId = null;
    return { sessionUserID: Session.userId as null };
  }

  // Identifies the logged-in user using session data.
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

  // Identifies the logged-in user using a custom decorator.
  @Get("whoami")
  @UseGuards(AuthGuard)
  @Serialize(ViewUserDto)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  // Sets a color preference in the session cookie.
  @Get("/colors/:color")
  setColor(@Param("color") color: string, @Session() session: CookieSessionInterfaces.CookieSessionObject) {
    session.color = color;
  }

  // Retrieves the color preference from the session cookie.
  @Get("/colors")
  getColors(@Session() session: CookieSessionInterfaces.CookieSessionObject) {
    return { color: session.color as string };
  }
}
