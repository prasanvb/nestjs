import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { User } from "../users/users.entity";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async createNewUser(email: string, password: string) {
    // Hashing new user password
    // Generate a salt
    const salt: string = randomBytes(8).toString("hex");

    // Hash the salt and the password together
    const hashBuffer = (await scrypt(password, salt, 32)) as Buffer<ArrayBufferLike>;
    const hash: string = hashBuffer.toString("hex");

    // Join the hashed result and the salt together
    const hashedPassword = salt + "." + hash;

    // Create new user and save it
    const newlyCreatedUser = await this.usersService.create(email, hashedPassword);

    // return newly created user
    return newlyCreatedUser;
  }

  async authenticateUser(user: User, password: string) {
    // Comparing hashed passwords to authenticate user
    const [salt, hashedPassword] = user.password.split(".");

    // Hash the salt and the password together
    const hashBuffer = (await scrypt(password, salt, 32)) as Buffer<ArrayBufferLike>;
    const hash: string = hashBuffer.toString("hex");

    if (hashedPassword !== hash) {
      throw new BadRequestException("User authentication failed");
    }

    return user;
  }
}
