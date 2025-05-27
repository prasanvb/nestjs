import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";

@Injectable()
export class UsersService {
  repo: Repository<User>;

  constructor(@InjectRepository(User) repo: Repository<User>) {
    this.repo = repo;
  }

  create(email: string, password: string) {
    /* create typeorm repository method generates a user entity instance */
    const user = this.repo.create({ email, password });

    /* save typeorm repository method saves the user entity instance created to the database */
    /* NOTE: Alternatively, we could call this.repo.save({ email, password }) directly.
       However, this would save the data without first creating a User entity instance.
       Creating the entity instance (with this.repo.create) ensures that TypeORM entity hooks
       like AfterInsert and AfterUpdate are triggered as expected.
    */
    return this.repo.save(user);
  }
}
