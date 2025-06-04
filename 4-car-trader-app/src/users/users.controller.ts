import { UsersService } from "./users.service";
import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  /*
    NOTE: Class Serializer Interceptor Approach
    UseInterceptors,
    ClassSerializerInterceptor, 
  */
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ViewUserDto } from "./dto/view-user.dto";
import { Serialize } from "./interceptor/serialize.intercept";

@Controller("user")
@Serialize(ViewUserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("auth/signup")
  createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;

    return this.usersService.create(email, password);
  }

  /*
    NOTE: Class Serializer Interceptor Approach
    @UseInterceptors(ClassSerializerInterceptor)
  */
  @Get(":id")
  async findUser(@Param("id") id: string) {
    console.log("Handler is running");
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException(`user with id:${id} not found`);
    }
    return user;
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
