import { UsersService } from "./users.service";
import { Body, Controller, Get, Post, Patch, Param, Query, Delete } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("auth/signup")
  createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;

    return this.usersService.create(email, password);
  }

  @Get(":id")
  findUser(@Param("id") id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  findUserByEmail(@Query("email") email: string) {
    return this.usersService.findByEmail(email);
  }

  @Delete(":id")
  removeUser(@Param("id") id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch(":id")
  updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
