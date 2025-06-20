import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { User } from "../users/users.entity";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // Creates a new user with a hashed password.
  async createNewUser(email: string, password: string) {
    // Generate a salt for password hashing
    const salt: string = randomBytes(8).toString("hex");

    // Hash the password with the salt
    const hashBuffer = (await scrypt(password, salt, 32)) as Buffer;
    const hash: string = hashBuffer.toString("hex");

    // Combine salt and hash for storage
    const hashedPassword = `${salt}.${hash}`;

    // Create and save the new user
    const newlyCreatedUser = await this.usersService.create(email, hashedPassword);
    return newlyCreatedUser;
  }

  // Authenticates a user by comparing hashed passwords.
  async authenticateUser(user: User, password: string) {
    const [salt, storedHash] = user.password.split(".");

    // Hash the provided password with the stored salt
    const hashBuffer = (await scrypt(password, salt, 32)) as Buffer;
    const hash: string = hashBuffer.toString("hex");

    if (storedHash !== hash) {
      throw new BadRequestException("User authentication failed");
    }

    return user;
  }
}
