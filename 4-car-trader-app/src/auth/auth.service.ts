import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { User } from "src/users/users.entity";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async createNewUser(email: string, password: string) {
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

  async authenticateUser(user: User, password: string) {
    // Comparing hashed passwords to authenticate user
    const [salt, hashedPassword] = user.password.split(".");

    console.log({ password });
    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer<ArrayBufferLike>;

    console.log({ hashedPassword });
    console.log({ hash: hash.toString("hex") });
    if (hashedPassword !== hash.toString("hex")) {
      throw new BadRequestException("User authentication failed");
    }

    return user;
  }
}
