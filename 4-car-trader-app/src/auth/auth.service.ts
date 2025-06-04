import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

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
}
