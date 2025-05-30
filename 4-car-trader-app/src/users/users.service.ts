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

    console.log({ user });

    /* save typeorm repository method saves the user entity instance created to the database */
    /* NOTE: Alternatively, we could call this.repo.save({ email, password }) directly.
       However, this would save the data without first creating a User entity instance.
       Creating the entity instance (with this.repo.create) ensures that TypeORM entity hooks
       like AfterInsert, AfterRemove and AfterUpdate are triggered as expected.
    */
    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attributes: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error(`user with ${id} not found`);
    }

    Object.assign(user, attributes);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error(`user with ${id} not found`);
    }

    return this.repo.remove(user);
  }
}
